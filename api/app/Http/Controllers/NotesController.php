<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function index(Request $request)
{
    // C'est la même chose, mais plus élégant
    $notes = $request->user()->notes()->orderBy('date_note', 'desc')->get();
    
    return response()->json([
        'status' => 200,
        'notess'  => $notes // J'ai corrigé "notess" en "notes"
    ]);
}
    /**
     * Store a newly created resource in storage.
     */
  public function store(Request $request)
{
    $request->validate([
        'title' => 'required',
        'body' => 'required'
    ]);

    $note = $request->user()->notes()->create([
        'title' => $request->title,
        'body' => $request->body,
        'date_note' =>$request->date_note, // Laravel génère la date et l'heure actuelle ici
    ]);

    return response()->json($note);
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
    public function update(Request $request)
    {
        $note=Note::find($request->id);
        $note->title=$request->title;
        $note->body=$request->body;
         $note->date_note=$request->date_note;
        $note->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,string $id)
    {
        $note=$request->user()->notes()->find($id);
        if($note->delete()){
            return response()->json(['status'=>200,'message'=>"note has been deleted succefully"]);
        }else{
            return response()->json(['status'=>502,'message'=>"failled to delete note"]);

        }
    }
}
