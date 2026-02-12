<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DepenseController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 🔹 Route pour récupérer l'utilisateur connecté
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 🔹 NOTES et DEPENSES protégées (utilisateur connecté obligatoire)
Route::middleware(['auth:sanctum'])->group(function () {
   //user
Route::get('user/index',[UserController::class,'index']);
Route::post('user/update',[UserController::class,'updateStatus']);
Route::post('userProfil/update',[UserController::class,'updateProfil']);




    // Notes
    Route::get("notes/index", [NotesController::class, 'index']);
    Route::post("notes/store", [NotesController::class, 'store']);
    Route::delete("notes/delete/{id}", [NotesController::class, 'destroy']);
    Route::post("notes/update", [NotesController::class, 'update']);



    // Dépenses
    Route::get("depense/index", [DepenseController::class, 'index']);
    Route::post("depense/store", [DepenseController::class, 'store']);
    Route::post("depense/filter", [DepenseController::class, 'filter']);
    Route::post("depense/update", [DepenseController::class, 'update']);
    Route::delete("depense/delete/{id}", [DepenseController::class, 'destroy']);


///CONTACT
Route::post('contact/store',[ContactController::class,'store']);
Route::get('contact/index',[ContactController::class,'index']);


});


