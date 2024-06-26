<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Pelanggan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data=Pelanggan::all();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request,[
            'pelanggan'=>'required|unique:pelanggans',
            'alamat'=>'required',
            'telp'=>'required|numeric',
        ]);

        $pelanggans= Pelanggan::create($request->all());
        // return response()->json($request);

        if ($pelanggans) {
            return response()->json([
                "msg"=>"datamu sudah masuk!",
                "data"=>$pelanggans,
            ]);
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

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pelanggan  $pelanggan
     * @return \Illuminate\Http\Response $id
     */
    public function show($id )
    {
        $data=Pelanggan::where('idpelanggan', $id)->first();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pelanggan  $pelanggan
     * @return \Illuminate\Http\Response
     */
    public function edit(Pelanggan $pelanggan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pelanggan  $pelanggan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pelanggan $pelanggan, $id)
    {
       $pelanggans= Pelanggan::where('idpelanggan', $id)->update($request->all());

        if ($pelanggans) {
            return response()->json([
                "msg"=>"sampun di upd",
                "data"=>$pelanggans
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pelanggan  $pelanggan
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pelanggans= Pelanggan::where('idpelanggan',$id)->delete();

        if ($pelanggans) {
            return response()->json([
                "msg"=>"sampun dilet",

            ]);
        }

    }
}
