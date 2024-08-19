<?php

namespace App\Http\Middleware;

use App\Models\Customers;
use Closure;

class TokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {  
       
            $token = $request->header('api_token');
            $guard =  Customers::where('api_token', $token)->first();
            if ($token && Customers::where('api_token', $token)->exists()) {
                if($guard->role == 0){
                    return response()->json(['error' => 'Unauthorized','token'=> $token], 401, );           
                }
                return $next($request); 
            }
    
       
    }
}
