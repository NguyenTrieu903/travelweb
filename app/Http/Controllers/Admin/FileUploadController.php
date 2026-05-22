<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UploadedFile;
use App\Services\UploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class FileUploadController extends Controller
{
    public function __construct(protected UploadService $uploadService)
    {
    }

    public function upload(Request $request): JsonResponse
    {
        $user = backpack_user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'You must be logged in to upload files.',
            ], 401);
        }

        if (!($user->is_admin == 1 || $user->is_admin == '1')) {
            return response()->json([
                'success' => false,
                'message' => 'Only admins can upload files.',
            ], 403);
        }

        $request->validate([
            'file' => 'required|file|mimes:pdf|max:30720',
            'context' => 'nullable|string|max:64|regex:/^[a-z0-9_-]+$/',
        ]);

        try {
            $uploadedFile = $this->uploadService->uploadPdf(
                $request->file('file'),
                $request->input('context', 'travel'),
                $user->id
            );

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $uploadedFile->id,
                    'original_name' => $uploadedFile->original_name,
                ],
                'message' => 'File uploaded successfully.',
            ], 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            Log::error('File upload error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'File upload failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function download(int $id): Response
    {
        $uploadedFile = UploadedFile::findOrFail($id);
        $user = backpack_user() ?? auth()->user();

        if (!$user || !Gate::forUser($user)->allows('download', $uploadedFile)) {
            abort(403);
        }

        $fileContent = $this->getExistingFileContent($uploadedFile);

        return response($fileContent, 200, [
            'Content-Type' => $uploadedFile->mime_type,
            'Content-Disposition' => 'attachment; filename="' . $uploadedFile->original_name . '"',
            'Content-Length' => $uploadedFile->size,
        ]);
    }

    public function view(int $id): Response
    {
        $uploadedFile = UploadedFile::findOrFail($id);
        $user = backpack_user() ?? auth()->user();

        if (!$user || !Gate::forUser($user)->allows('view', $uploadedFile)) {
            abort(403);
        }

        $fileContent = $this->getExistingFileContent($uploadedFile);

        return response($fileContent, 200, [
            'Content-Type' => $uploadedFile->mime_type,
            'Content-Disposition' => 'inline; filename="' . $uploadedFile->original_name . '"',
            'Content-Length' => $uploadedFile->size,
        ]);
    }

    protected function getExistingFileContent(UploadedFile $uploadedFile): string
    {
        if (!$this->uploadService->fileExists($uploadedFile)) {
            abort(404);
        }

        $fileContent = $this->uploadService->getFileContent($uploadedFile);

        if ($fileContent === null) {
            abort(404);
        }

        return $fileContent;
    }
}
