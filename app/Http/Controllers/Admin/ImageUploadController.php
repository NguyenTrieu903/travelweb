<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'image' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:8192'
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');

                // Generate unique filename
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

                // Store file
                $path = $file->storeAs('images', $filename, 'public');

                // Get public URL
                $url = Storage::url('images/' . $filename);

                // Debug log
                \Log::info('File uploaded successfully', [
                    'filename' => $filename,
                    'path' => $path,
                    'url' => $url,
                    'storage_path' => storage_path('app/' . $path)
                ]);

                return response()->json([
                    'success' => true,
                    'url' => $url,
                    'filename' => $filename,
                    'path' => $path,
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType()
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không có file được upload'
            ], 400);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Lỗi upload: ' . $e->getMessage()
            ], 500);
        }
    }

    public function uploadMultiple(Request $request)
    {
        try {
            // Validate request
            $request->validate([
                'images' => 'required|array',
                'images.*' => 'file|mimes:jpeg,png,jpg,gif,webp,svg|max:8192'
            ]);

            if ($request->hasFile('images')) {
                $files = $request->file('images');
                $uploadedUrls = [];
                $errors = [];

                foreach ($files as $index => $file) {
                    try {
                        // Generate unique filename
                        $filename = time() . '_' . $index . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

                        // Store file
                        $path = $file->storeAs('images', $filename, 'public');

                        // Get public URL
                        $url = Storage::url('images/' . $filename);

                        $uploadedUrls[] = $url;

                        \Log::info('Multiple file uploaded successfully', [
                            'index' => $index,
                            'filename' => $filename,
                            'path' => $path,
                            'url' => $url
                        ]);
                    } catch (\Exception $e) {
                        $errors[] = "File {$index}: " . $e->getMessage();
                        \Log::error("Multiple upload error for file {$index}: " . $e->getMessage());
                    }
                }

                if (!empty($uploadedUrls)) {
                    return response()->json([
                        'success' => true,
                        'urls' => $uploadedUrls,
                        'count' => count($uploadedUrls),
                        'errors' => $errors
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Không có file nào được upload thành công',
                        'errors' => $errors
                    ], 400);
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Không có file được upload'
            ], 400);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Multiple image upload error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Lỗi upload: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request)
    {
        try {
            $filename = $request->input('filename');

            if (!$filename) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tên file không được để trống'
                ], 400);
            }

            // Clean filename để tránh path traversal
            $filename = basename($filename);

            $path = 'images/' . $filename;

            \Log::info('Attempting to delete image', [
                'filename' => $filename,
                'path' => $path,
                'storage_path' => storage_path('app/public/' . $path)
            ]);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                \Log::info('Image deleted successfully', [
                    'filename' => $filename,
                    'path' => $path
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Xóa file thành công',
                    'filename' => $filename
                ]);
            }

            \Log::warning('Image file not found', [
                'filename' => $filename,
                'path' => $path
            ]);

            return response()->json([
                'success' => false,
                'message' => 'File không tồn tại'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Image delete error: ' . $e->getMessage(), [
                'filename' => $request->input('filename'),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Lỗi xóa file: ' . $e->getMessage()
            ], 500);
        }
    }
}
