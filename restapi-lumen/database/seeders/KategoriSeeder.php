<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker= Faker::create();

        for ($i=0; $i <100 ; $i++) {


        $data = [
            'kategori'=> $faker -> name,
            'keterangan'=> $faker -> ean13,
        ];

        Kategori::create($data);
       }
    }
}
