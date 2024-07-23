<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Customers=Customers::all();
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

        $password=Hash::make($request->input('password'));

        $data = [
            'email' => $request->input('email'),
            'password' => $password,
            'api_token' =>  "123"
        ];

        $Cust=Customers::create($data);
        if ($Cust) {
            return response()->json([
                'data'=> $Cust,
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
        $password= $request->input('password');

        $customers=Customers::where('email',$email)->first();

        if (isset($customers)) {

            if ($customers->status == 0) {
                return response()->json([
                    'pesan' => 'Account is Banned',
                    'data' => ''
                ], 403);
            }
                    if (Hash::check($password, $customers->password)){
                        $token="123";
                        $customers->update([
                            'api_token' => $token,
                        ]);
                        return response()->json([
                            'pesan' => 'login sukses',
                            'token' => $token,
                            'data' => $customers,
                        ], 200);
                    } else {
                        return response()->json([
                            'pesan' => 'wrong password dumbas',
                            'data' => ''
                        ], 401);
                    }
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
        $result=Customers::where('id',$id)->first();
        return response()->json($result);
    }
    public function topupSaldo(Customers $customers, Request $request, $id)
    {
        $Cust=Customers::where('id',$id)->first();
        $Cust->saldo += $request->input('saldo');
        $Cust->save();
        return response()->json($Cust);
    }

}
