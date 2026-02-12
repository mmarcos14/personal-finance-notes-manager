<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;


class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }


 public function update(Request $request): Response
    {
        $user = $request->user(); // user connecté (Sanctum)
        //dd($user);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                 'required',
                 'email',
                  Rule::unique('users')->ignore($user->id),
            ],
            'current_password' => ['required'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ]);

        // Vérification ancien mot de passe
        if (!Hash::check($request->current_password, $user->password)) {
            return response([
                'errors' => [
                    'current_password' => ['Current password is incorrect']
                ]
            ], 422);
        }

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        // Update password seulement si fourni
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->noContent(); // 204
    }
}
