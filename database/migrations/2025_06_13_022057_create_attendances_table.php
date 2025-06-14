<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->date('request_date')->nullable(false);
            $table->string('name', 100)->nullable(false);
            $table->string('requester_name', 100)->nullable(true);
            $table->enum(
                'priority_level',
                ['01', '02', '03', '04']
            )->nullable(false)
                ->comment('01: Baixo, 02: Médio, 03: Alto, 04: Urgente');
            $table->string('phone', 11)->nullable(false)->comment('Format: DDD + number (ex: 11999999999)');

            // $table->string('street', 100)->nullable(false);
            // $table->string('number', 10)->nullable(false);
            // $table->string('complement', 50)->nullable(true);
            // $table->string('neighborhood', 50)->nullable(false);
            // $table->string('city', 50)->nullable(false);
            // $table->string('state', 2)->nullable(false);
            // $table->string('zip_code', 8)->nullable(false);

            $table->string('address', 100)->nullable(false);

            // Relationship with Operator (USER)
            $table->integer('operator_id')->nullable(false)->index();
            $table->foreign('operator_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict')
                ->onUpdate('cascade');

            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
