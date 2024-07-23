<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order = Order::join('fish', 'orders.idikan', '=', 'fish.id')
        ->join('customers','orders.idpelanggan','=','customers.id')
        ->select('customers.email','customers.id as idcustomer','orders.id as idorder', 'orders.jumlah', 'orders.total','orders.status', 'orders.tglorder', 'fish.ikan', 'fish.gambar', 'fish.hargaumum','fish.bestseller')
        ->orderBy('tglorder')
        ->get();
        return response()->json($order);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */



    public function create(Request $request)
    {


        $this->validate($request, [
            'jumlah' => 'required',
            'harga' => 'required',
            'idpelanggan' => 'required',
            'idikan' => 'required',
        ]);

        $data = [
            'total' => $request->input('harga'),
            'jumlah' => $request->input('jumlah'),
            'status' => 0,
            'idpelanggan' => $request->input('idpelanggan'),
            'idikan' => $request->input('idikan'),
            'tglorder' => Carbon::now(),

            //carbon:now = current timestamp btw :p (Lawrens)
        ];

        $order = Order::create($data);

        if ($order) {
            return response()->json([
                'status' => 201,
                'msg' => 'Order berhasil ditambahkan',
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
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order, $a, $b)
    {
        $order = Order::join('fish', 'orders.idikan', '=', 'fish.id')
        ->join('customers','orders.idpelanggan','=','customers.id')
        ->select('customers.email','customers.id as idcustomer','orders.id as idorder', 'orders.jumlah', 'orders.total','orders.status', 'orders.tglorder', 'fish.ikan', 'fish.gambar', 'fish.hargaumum','fish.bestseller')
        ->where('tglorder','>=',$a)
        ->where('tglorder','<=',$b)
        ->orderBy('tglorder')
        ->get();
        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order, $id)
    {
        $data = Order::where('id', $id)->delete();
        if ($data) {
            return response()->json([
                "msg" => "Thoust Data Has been Deleted",
                "status" => 200
            ]);
        }
    }

    public function seeCart(Request $request, $idpelanggan)
    {
        $Cart = Order::join('fish', 'orders.idikan', '=', 'fish.id')
            ->select('orders.id as idorder', 'orders.jumlah', 'orders.total', 'orders.tglorder', 'fish.id', 'fish.ikan', 'fish.gambar', 'fish.hargaumum', 'fish.bestseller')
            ->where('idpelanggan', $idpelanggan)
            ->where('status', 0)
            ->orderBy('tglorder')
            ->get();
        return response()->json($Cart);
    }
    public function seeCartHist(Request $request, $idpelanggan)
    {
        $Cart = Order::join('fish', 'orders.idikan', '=', 'fish.id')
            ->select('orders.id as idorder', 'orders.jumlah', 'orders.total', 'orders.tglorder', 'fish.id', 'fish.ikan', 'fish.gambar', 'fish.hargaumum', 'fish.bestseller')
            ->where('idpelanggan', $idpelanggan)
            ->where('status', 1)
            ->orderBy('tglorder')
            ->get();
        return response()->json($Cart);
    }
    public function buy(Request $request, $id)
    {
        
        $order = Order::where('id', $id)->first();
        $customer = Customers::where('id', $request->input('idpelanggan'))->first();

        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
       
        if ($customer->saldo < $order->total) {
            return response()->json(['error' => 'Insufficient balance'], 400);
        }

   
        $customer->saldo -= $order->total;
        $customer->save();

        $order->status = 1;
        $order->bayar = $order->total;
        $order->kembali= 0;
        $order->save();

        return response()->json([
            'message' => 'Transaction successful. Order status updated.',
            'data' => $order
            ]
    );
    }
}
