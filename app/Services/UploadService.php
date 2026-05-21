<?php

namespace App\Services;

use App\Models\UploadedFile;
use Illuminate\Http\UploadedFile as HttpUploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadService
{
    public function uploadPdf(HttpUploadedFile $file, string $context = 'travel', ?int $userId = null): UploadedFile
    {
        if (!preg_match('/^[a-z0-9_-]+$/', $context)) {
            throw new \InvalidArgumentException('Invalid upload context.');
        }

        if ($file->getMimeType() !== 'application/pdf') {
            throw new \InvalidArgumentException('Only PDF files are allowed.');
        }

        $maxSize = 30 * 1024 * 1024;
        if ($file->getSize() > $maxSize) {
            throw new \InvalidArgumentException('File size must not exceed 30MB.');
        }

        $storedName = Str::uuid()->toString() . '.pdf';
        $path = 'uploads/documents/' . $context;
        $storedPath = $file->storeAs($path, $storedName, 'local');

        if (!$storedPath) {
            throw new \RuntimeException('Unable to store the uploaded file.');
        }

        $sha256 = hash('sha256', Storage::disk('local')->get($storedPath));
        $existingFile = UploadedFile::where('sha256', $sha256)->first();

        if ($existingFile) {
            $existingPath = $existingFile->path . '/' . $existingFile->stored_name;

            if (Storage::disk('local')->exists($existingPath)) {
                Storage::disk('local')->delete($storedPath);

                return $existingFile;
            }
        }

        $uploadedFile = UploadedFile::create([
            'original_name' => $file->getClientOriginalName(),
            'stored_name' => $storedName,
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'sha256' => $sha256,
            'uploaded_by' => $userId,
        ]);

        Log::info('File uploaded successfully', [
            'file_id' => $uploadedFile->id,
            'original_name' => $uploadedFile->original_name,
            'context' => $context,
            'user_id' => $userId,
        ]);

        return $uploadedFile;
    }

    public function deleteFile(UploadedFile $uploadedFile): bool
    {
        $filePath = $uploadedFile->path . '/' . $uploadedFile->stored_name;

        if (Storage::disk('local')->exists($filePath)) {
            Storage::disk('local')->delete($filePath);
        }

        return $uploadedFile->delete();
    }

    public function getFileContent(UploadedFile $uploadedFile): ?string
    {
        $filePath = $uploadedFile->path . '/' . $uploadedFile->stored_name;

        if (!Storage::disk('local')->exists($filePath)) {
            return null;
        }

        return Storage::disk('local')->get($filePath);
    }

    public function fileExists(UploadedFile $uploadedFile): bool
    {
        $filePath = $uploadedFile->path . '/' . $uploadedFile->stored_name;

        return Storage::disk('local')->exists($filePath);
    }
}
