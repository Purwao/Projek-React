<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Http\Controllers\FishController;

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

$router->get('fish','FishController@index');
$router->post('fish','FishController@create');
$router->delete('fish/{id}','FishController@destroy');
$router->get('bestseller','FishController@bestseller');

$router->get('/customer','CustomersController@index');
$router->post('/reg','CustomersController@create');