<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker=Faker::create();

        for ($i=0; $i < 100 ; $i++) {



        $data = [
            'email'=>$faker -> name,
            'alamat'=>$faker -> state,
            'telp'=>$faker -> phoneNumber,
        ];

        user::create($data);
         }
    }
}
