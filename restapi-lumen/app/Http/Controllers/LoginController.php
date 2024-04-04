<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
{
    public function index()
    {
        $data = User::where('level', '<>', 'pelanggan')->get();
        return response()->json($data);
    }

    public function register(Request $request)
    {
            $data = [
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'level' => $request -> input('level'),
                'api_token' => '123',
                'status' => 1,
                'relasi' => $request-> input('relasi'),
            ];

            User::create($data);
            return response()->json($data);

    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (isset($user)) {
            if ($user->status === 1) {
                    if (Hash::check($password, $user->password)){
                        $token = Str::random(40);
                        $user->update([
                            'api_token' => $token,
                        ]);

                        return response()->json([
                            'pesan' => 'YOU Logged in as the mighty:',
                            'token' => $token,
                            'data' => $user,
                        ], 200);
                    } else {
                        return response()->json([
                            'pesan' => 'wrong password dumbas',
                            'data' => ''
                        ], 401);
                    }
                } else {
                    return response()->json([
                        'pesan' => 'i think u are banned lil guy',
                        'data' => ''
                    ], 402);
                }
        } else {
            return response()->json([
                'pesan' => '???',
                'data' => ''
            ], 403);
        }

    }

    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->update($request->all());

        if ($user) {
            return response()->json("Mengupdate user dengan ID $id", 201);
        }
    }


}
