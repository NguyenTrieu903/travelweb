<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class FileController extends Controller
{
    /**
     * Upload multiple images
     */
    public function uploadMultipleImages(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'images' => 'required|array|max:10',
                'images.*' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:8192'
            ]);

            $uploadedUrls = [];

            foreach ($request->file('images') as $file) {
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('images', $filename, 'public');
                $uploadedUrls[] = Storage::url($path);
            }

            return response()->json([
                'success' => true,
                'urls' => $uploadedUrls,
                'message' => 'Upload thành công ' . count($uploadedUrls) . ' hình ảnh'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete image
     */
    public function deleteImage(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'filename' => 'required|string|max:255'
            ]);

            $filePath = 'images/' . $request->filename;

            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);

                return response()->json([
                    'success' => true,
                    'message' => 'File đã được xóa thành công'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'File không tồn tại'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
