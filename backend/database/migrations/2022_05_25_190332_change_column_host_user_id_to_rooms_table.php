<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropConstrainedForeignId('host_user_id');
            $table->foreignUuid('host_connection_unit_id')
                ->nullable()
                ->references('id')
                ->on('connection_units')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropConstrainedForeignId('host_connection_unit_id');
            $table->foreignId('host_user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }
};
