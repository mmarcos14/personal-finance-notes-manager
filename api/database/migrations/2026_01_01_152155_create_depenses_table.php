<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('depenses', function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->string("motif");
            $table->string("typeT");
            $table->decimal("amount",8,2);
            $table->date("date_transfert");
            $table->integer("user_id")->unsigned();
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->timestamps();
        });
    }
 protected $fillable=['name','motif','typeT','amount','user_id','date_transfert'];
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depenses');
    }
};
