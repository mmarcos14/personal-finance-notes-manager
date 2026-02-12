<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Depense extends Model
{
    protected $table="depenses";
     protected $fillable=['category',
     'recipient','transactionType',
     'paymentMethod','paymentMethod','amount','isGambling','description','date_transfert','user_id'];

     public function user(){
        return $this->belongsTo(User::class);
     }
}
  