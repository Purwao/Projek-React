<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker=Faker::create();

        for ($i=0; $i < 20; $i++) {
            $data=[
                'menu'=> $faker -> word,
                'gambar'=> $faker -> imageUrl,
                'harga'=> $faker -> numberBetween(1000,100000),
            ];

            Menu::create($data);
        }

    }
}
