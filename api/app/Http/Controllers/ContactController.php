<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contact=Contact::OrderBy('id','DESC')->get();
        return response()->json(['status'=>200,'contactss'=>$contact]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'firstname'=>'required',
            'email'=>'required|email',
            'description'=>'required'

        ]);
        $contact=new Contact();
        $contact->name=$request->name;
        $contact->firstname=$request->firstname;
        $contact->email=$request->email;
        $contact->description=$request->description;
        $contact->save();
        if($contact){
            return response()->json(['status'=>200,'message'=>'message was sent successfully']);
        }else{
            return response()->json(['status'=>502,'message'=>'somethings wrong,message was not sent']);

        }
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
