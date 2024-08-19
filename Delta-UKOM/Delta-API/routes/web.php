<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use App\Http\Controllers\CustomersController;
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

$router->post('/reg', 'CustomersController@create');
$router->post('/login', 'CustomersController@login');
$router->post('/sendotp', 'CustomersController@OTP');
$router->post('/verifyotp', 'CustomersController@OTPVerify');
$router->post('/topup/{id}', 'CustomersController@topupSaldo');
$router->get('bestseller', 'FishController@bestseller');
$router->post('search', 'FishController@search');
$router->post('search1', 'FishController@search1');
$router->get('modal/{id}', 'FishController@modal');
$router->get('modal1/{id}', 'FishController@modal1');
$router->get('/customer/{id}', 'CustomersController@seeSaldo');
$router->post('/beli/{id}', 'OrderController@buy');
$router->post('/beli', 'OrderController@create');
$router->get('/cart/{idpelanggan}', 'OrderController@seeCart');
$router->get('/cartHist/{idpelanggan}', 'OrderController@seeCartHist');
$router->delete('/cart/{id}', 'OrderController@destroy');


$router->group(['middleware' => 'token.auth'], function () use ($router) {
    $router->get('fish', 'FishController@index');
    $router->post('fish', 'FishController@create');
    $router->delete('fish/{id}', 'FishController@destroy');
    $router->get('/customer', 'CustomersController@index');
    $router->post('/banUser/{id}', 'CustomersController@banUser');
    $router->post('/permitUser/{id}', 'CustomersController@permitUser');
    $router->post('/switchRole/{id}', 'CustomersController@switchRole');
    $router->get('/order', 'OrderController@index');
    $router->get('/order/{a}/{b}', 'OrderController@show');
});
