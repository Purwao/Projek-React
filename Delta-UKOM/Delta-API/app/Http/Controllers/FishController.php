<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use Illuminate\Http\Request;

class FishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fish = Fish::all();
        return response()->json($fish);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'ikan' => 'required',
            'habitat' => 'required',
            'gambar' => 'required',
            'hargaumum' => 'required',
            'ukuranumum' => 'required',
            'bestseller'=>'required',
        ]);

        $gambar = $request->file('gambar');
        $namagambar = $gambar->getClientOriginalName();
        $gambar->move('upload/', $namagambar);

        $data = [
            'ikan' => $request->input('ikan'),
            'habitat' => $request->input('habitat'),
            'gambar' => url('upload/' . $namagambar), 
            'hargaumum' => $request->input('hargaumum'),
            'ukuranumum' => $request->input('ukuranumum'),
            'bestseller'=>$request->input('bestseller')
        ];

        $fish = Fish::create($data);

        if ($fish) {
            return response()->json([
                'status' => 201,
                'msg' => 'Data berhasil ditambahkan',
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
     * @param  \App\Models\Fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function show(Fish $fish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function edit(Fish $fish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fish $fish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fish  $fish
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data=Fish::where('id',$id)->delete();
        if($data){
            return response()->json([
                "msg"=>"Thoust Data Has been Deleted",
                "status"=>200
            ]); 
        }

    }
    public function bestseller()
    {
        $bestseller=Fish::where('bestseller',1)->get();
        return response()->json($bestseller);
    }


    public function search(Request $request)
    {
        $search=$request->input('search');

        $result=Fish::where('ikan',$search)->first();

        if (!$result) {
            $result = 'Data Not Found';
        }else{
             return response()->json($result);
        }

       
    }

    public function search1(Request $request)
    {
       $habitat= $request->input('habitat');
       $ukuran=$request->input('ukuran');

       if ($ukuran && $habitat) {
        $result = Fish::where('habitat', $habitat)
                       ->where('ukuranumum', $ukuran)
                       ->get();


 if (!$result) {
            $result = 'Data Not Found';
        }else{
             return response()->json($result);
        }

       }

      
    }
    public function modal(Request $request, $id)
    {

        $result=Fish::where('id',$id)->first();

        if (!$result) {
            $result = 'Data Not Found';
        }else{
             return response()->json($result);
        }

       
    }
    // public function modal1(Request $request, $id)
    // {

    //     $result=Fish::where('id',$id)->first();

    //     if (!$result) {
    //         $result = 'Data Not Found';
    //     }else{
    //          return response()->json($result);
    //     }

       
    // }

}
