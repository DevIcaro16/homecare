<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        Schema::table('attendances', function (Blueprint $table) {

            $table->dropPrimary('id');

            $table->dropColumn('id');

            $table->uuid('id')->primary()->first();
        });
    }

    public function down()
    {
        Schema::table('attendances', function (Blueprint $table) {

            $table->dropPrimary('id');

            $table->dropColumn('id');

            $table->id()->first();
        });
    }
};