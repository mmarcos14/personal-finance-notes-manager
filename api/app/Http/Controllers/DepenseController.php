<?php

namespace App\Http\Controllers;

use App\Models\Depense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $depenses=$request->user()->depenses()->orderBy("created_at",'DESC')->get();
          return response()->json([
        'status' => 200,
        'ddepense'  => $depenses // J'ai corrigé "notess" en "notes"
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // 1. Validation
    $request->validate([
        'category' => 'required',
        'recipient' => 'required|string|max:255',
        'recipient' => 'required|string|max:255',
        'transactionType' => 'required',
        'paymentMethod' => 'required',
        'description' =>'required',
        'amount' => 'required|numeric|min:0.01',
    ]);

    // 2. Création
    $depense = $request->user()->depenses()->create([
        'category' => $request->category,
        'recipient' => $request->recipient,
        'transactionType' => $request->transactionType,
         'paymentMethod' => $request->paymentMethod,
         'amount' =>  $request->transactionType==="Income" ? $request->amount:-$request->amount,
        'isGambling' => $request->isGambling===TRUE ? "1" : "0",
         'description' => $request->description,
         'date_transfert' => $request->date_transfert
    ]);
    // 3. Retour JSON
    return response()->json([
        'message' => 'Depense enregistrée avec succès',
        'depense' => $depense,
    ], 201);
}

 // protected $fillable=['name','motif','typeT','amount','user_id','date_transfert'];
    /**
     * Display the specified resource.
     */
    public function show(Depense $depense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request)
{
    // 1. Validation
    $validated = $request->validate([
        'id' => 'required|exists:depenses,id',
        'category' => 'required|string|max:255',
        'recipient' => 'required|string|max:255',
        'transactionType' => 'required|in:Income,Expense',
        'paymentMethod' => 'required|string|max:255',
        'description' => 'required|string',
        'amount' => 'required|numeric|min:0.01',
        'isGambling' => 'nullable|boolean',
        //'date_transfert' => 'required|date',
    ]);

    // 2. Récupération sécurisée de la dépense de l'utilisateur
    $depense = $request->user()
        ->depenses()
        ->where('id', $validated['id'])
        ->firstOrFail();

    // 3. Mise à jour
    $depense->update([
        'category' => $validated['category'],
        'recipient' => $validated['recipient'],
        'transactionType' => $validated['transactionType'],
        'paymentMethod' => $validated['paymentMethod'],
        'amount' => $validated['transactionType'] === 'Income'
            ? $validated['amount']
            : -$validated['amount'],
        'isGambling' => $validated['isGambling'] ?? false,
        'description' => $validated['description'],
        //'date_transfert' => $validated['date_transfert'],
    ]);

    // 4. Réponse JSON
    return response()->json([
        'message' => 'Dépense mise à jour avec succès',
        'depense' => $depense,
    ], 200);
}

public function filter(Request $request)
{
    $date1 = $request->date1;
    $date2 = $request->date2;
    $motif = $request->motif;
    $type  = $request->type;

    $depenses = DB::table('depenses')
        ->select(
            'depenses.recipient as motif',
            DB::raw('SUM(depenses.amount) as total')
        )

        // Filtre par dates
        ->when($date1 && $date2, function ($query) use ($date1, $date2) {
            $query->whereBetween('date_transfert', [$date1, $date2]);
        })

        // Filtre par motif
        ->when($motif, function ($query) use ($motif) {
            $query->where('depenses.recipient', $motif);
        })

        // Filtre par type
        ->when($type, function ($query) use ($type) {
            $query->where('transactionType', $type);
        })

        // Groupement TOUJOURS à la fin
        ->groupBy('depenses.recipient')

        ->get();

    return response()->json([
        'depenses' => $depenses
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
  public function destroy(Request $request, $id)
{
    // Récupérer la dépense appartenant à l'utilisateur connecté
    $depense = $request->user()
        ->depenses()
        ->where('id', $id)
        ->first();

    if (!$depense) {
        return response()->json([
            'message' => 'Dépense introuvable'
        ], 404);
    }

    $depense->delete();

    return response()->json([
        'message' => 'Dépense supprimée avec succès'
    ], 200);
}

}
