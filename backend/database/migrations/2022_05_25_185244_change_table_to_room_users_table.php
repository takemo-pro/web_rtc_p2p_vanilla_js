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
        Schema::table('room_users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->foreignUuid('connection_unit_id')
                ->references('id')
                ->on('connection_units')
                ->cascadeOnDelete();
        });
        Schema::rename('room_users','room_connection_units');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('room_connection_units','room_users');
        Schema::table('room_users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('connection_unit_id');
            $table->foreignId('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }
};
