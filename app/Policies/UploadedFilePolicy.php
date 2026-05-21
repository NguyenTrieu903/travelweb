<?php

namespace App\Policies;

use App\Models\UploadedFile;
use App\Models\User;

class UploadedFilePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, UploadedFile $uploadedFile): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $this->isAdmin($user);
    }

    public function update(User $user, UploadedFile $uploadedFile): bool
    {
        return $this->isAdmin($user);
    }

    public function delete(User $user, UploadedFile $uploadedFile): bool
    {
        return $this->isAdmin($user);
    }

    public function download(User $user, UploadedFile $uploadedFile): bool
    {
        return true;
    }

    public function restore(User $user, UploadedFile $uploadedFile): bool
    {
        return false;
    }

    public function forceDelete(User $user, UploadedFile $uploadedFile): bool
    {
        return false;
    }

    protected function isAdmin(User $user): bool
    {
        return $user->is_admin == 1 || $user->is_admin == '1';
    }
}
