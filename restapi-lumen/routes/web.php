<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Http\Controllers\KategoriController;
use App\Models\Kategori;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router ->group(['prefix'=>'api'], function () use($router){
        $router->get('/',['uses'=>'KategoriController@index']);
        $router->get('/kategori',['uses'=>'KategoriController@show']);
        $router->delete('/kategori/{id}',['uses'=>'KategoriController@destroy']);
        $router->put('/kategori/{id}',['uses'=>'KategoriController@update']);
        $router->post('/kategori/{id}',['uses'=>'KategoriController@create']);



        $router->get('/pelanggan', ['uses' => 'PelangganController@index']);
        $router->get('/pelanggan/{id}', ['uses' => 'PelangganController@show']);
        $router->post('/pelanggan', ['uses' => 'PelangganController@create']);
        $router->put('/pelanggan/{id}', ['uses' => 'PelangganController@update']);
        $router->delete('/pelanggan/{id}', ['uses' => 'PelangganController@destroy']);


        $router->get('menu', ['uses' => 'MenuController@index']);
        $router->get('/menu/{id}', ['uses' => 'MenuController@show']);
        $router->post('/menu', ['uses' => 'MenuController@create']);
        $router->post('/menu/{id}', ['uses' => 'MenuController@update']);
        $router->delete('/menu/{id}', ['uses' => 'MenuController@destroy']);

    });



