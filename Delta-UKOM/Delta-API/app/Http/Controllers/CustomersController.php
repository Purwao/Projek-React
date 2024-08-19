<?php

namespace App\Http\Controllers;

use App\Mail\SendOtpMail;
use App\Models\Customers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Customers = Customers::all();
        return response()->json($Customers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        $password = Hash::make($request->input('password'));
        $token = Str::random(40);
        $data = [
            'email' => $request->input('email'),
            'password' => $password,
            'api_token' =>  $token
        ];

        $Cust = Customers::create($data);
        if ($Cust) {
            return response()->json([
                'data' => $Cust,
                'status' => 201,
                'msg' => 'Data berhasil ditambahkan',
            ]);
        }
    }
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        $customers = Customers::where('email', $email)->first();

        if (isset($customers)) {

            if ($customers->status == 0) {
                return response()->json([
                    'pesan' => 'Account is Banned',
                    'data' => ''
                ], 403);
            }
            if (Hash::check($password, $customers->password)) {
                $token = Str::random(40);
                $customers->update([
                    'api_token' => $token,
                ]);
                return response()->json([
                    'pesan' => 'login sukses',
                    'token' => $token,
                    'data' => $customers,
                ], 200) ->header('api_token',$token);
            } else {
                return response()->json([
                    'pesan' => 'wrong password dumbas',
                    'data' => ''
                ], 401);
            }
        }
    }

    public function OTP(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
        ]);
        $user= Customers::where('email', $request->input('email'))->first(); 
        
        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }

        $otp = rand(100000, 999999);//6 angka 
        $user->otp = $otp;
        $user->save();

        $emailUser= $request->input('email');
        Mail::to($emailUser)->send(new SendOtpMail($otp, $user->email));

         return response()->json(['message' => 'OTP sent to your email.']);
    }


    public function OTPverify(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
        ]);
        $user= Customers::where('email', $request->input('email'))->first(); 
        
        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404);
        }
        if ($user->otp == $request->input('otp')) {
            // OTP is correct, proceed with your logic
            return response()->json(['message' => 'OTP verified successfully.','status'=>200]);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function show(Customers $customers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function edit(Customers $customers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customers $customers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customers  $customers
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customers $customers)
    {
        //
    }

    public function seeSaldo(Customers $customers, $id)
    {
        $result = Customers::where('id', $id)->first();
        return response()->json($result);
    }
    public function topupSaldo(Customers $customers, Request $request, $id)
    {
        $Cust = Customers::where('id', $id)->first();
        $Cust->saldo += $request->input('saldo');
        $Cust->save();
        return response()->json($Cust);
    }
    public function banUser(Customers $customers, $id)
    {
        $result = Customers::where('id', $id)->first();
        $result->status = 0;
        $result->save();
        return response()->json($result);
    }
    public function permitUser(Customers $customers, $id)
    {
        $result = Customers::where('id', $id)->first();
        $result->status = 1;
        $result->save();
        return response()->json($result);
    }

    public function switchRole(Customers $customers, $id)
    {
        $result = Customers::where('id', $id)->first();
        if ($result->role < 3) {
            $result->role += 1;
        } else {
            $result->role = 0;
        }

        $result->save();

        return response()->json($result);
    }
}
