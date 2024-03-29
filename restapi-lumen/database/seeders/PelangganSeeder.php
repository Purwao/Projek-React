<?php

namespace Database\Seeders;

use App\Models\Pelanggan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class PelangganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker= Faker::create();

        for ($i=0; $i < 100 ; $i++) {



        $data = [
            'pelanggan'=>$faker -> name,
            'alamat'=>$faker -> state,
            'telp'=>$faker -> phoneNumber,
        ];

        Pelanggan::create($data);
         }
    }
}
