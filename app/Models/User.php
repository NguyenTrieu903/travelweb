<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'user_name',
        'email',
        'password',
        'TokenID',
        'F1UserID',
        'role',
        'status',
        'is_active',
        'is_admin',
        'address',
        'phone',
        'avatar',
        'gender',
        'birthday',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function generateUniqueToken(): string
    {
        do {
            $token = str_pad((string) random_int(100000000, 999999999), 9, '0', STR_PAD_LEFT);
        } while (static::where('remember_token', $token)->exists());

        return $token;
    }
}
