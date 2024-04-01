<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $data= Menu::all();
        // return response ()->json($data);
        $data = DB::table('menus')
            ->join('kategoris','kategoris.idkategori', '=', 'menus.idkategori')
            ->select('menus.*','kategoris.kategori')
            ->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
{
    $this->validate($request, [
        'idkategori' => 'required|numeric',
        'menu' => 'required',
        'gambar' => 'required|max:2048',
        'harga' => 'required|numeric',
    ]);

    // Check if file is present in the request
    if ($request->hasFile('gambar')) {
        $namagambar = $request->file('gambar')->getClientOriginalName();
        $request->file('gambar')->move('upload', $namagambar);

        $data = [
            'idkategori' => $request->input('idkategori'),
            'menu' => $request->input('menu'),
            'gambar' => url('upload/', $namagambar),
            'harga' => $request->input('harga'),
        ];

        $menu = Menu::create($data);

        if ($menu) {
            return response()->json([
                'status' => 201,
                'pesan' => 'Data menu berhasil ditambahkan',
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'pesan' => 'Gagal menambahkan data menu',
            ]);
        }
    } else {
        return response()->json([
            'status' => 400,
            'pesan' => 'Gambar tidak ditemukan dalam request',
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data=Menu::where('idmenu',$id)->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data=Menu::where('idmenu',$id)->delete();
        if($data){
            return response()->json([
                "msg"=>"The memory became vague overtime, so does the data."
            ]);
        }

    }
}
