<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::orderBy("id","ASC")->get();
        return response()->json(['status'=>200,'user'=>$users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
public function updateStatus(Request $request)
{
    $request->validate([
        'id' => 'required|exists:users,id',
        'decision' => 'required|integer'
    ]);
    $user = User::find($request->id);
    $user->status=$request->decision;
    $user->save();

    return response()->json([
        'status' => 200,
        'message' => 'Update successful'
    ]);
}


public function updateProfil(Request $request)
{
    $user = $request->user();

    // Validation
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'string',
            'email',
            'max:255',
            Rule::unique('users')->ignore($user->id),
        ],
        'password' => 'nullable|min:6', // mot de passe optionnel
    ]);

    // Mise à jour des infos obligatoires
    $user->name = $request->name;
    $user->email = $request->email;

    // Mise à jour du mot de passe seulement si l'utilisateur en fournit un
    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }

    $user->save();

    return response()->json([
        'message' => 'Profil mis à jour avec succès',
        'user' => $user
    ]);
}



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
