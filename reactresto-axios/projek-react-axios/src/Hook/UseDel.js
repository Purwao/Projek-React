import {useState } from "react";
import { link } from "../Axios/link";

function UseDel(url) {
    const [pesan, setPesan] = useState('');

    async function del(id){
        if (window.confirm('Yakin menghapus data ini?')) {
            const res = await link.delete(`${url}/${id}`)
            setPesan(res.data.msg)
        }

        

        // await link.delete('/pelanggan/'+id).then(res=>{
        //     setPesan(res.data.msg)
        //     console.log(res.data)
        // })
            
    }

    return {del, pesan, setPesan};  
}

export default UseDel;