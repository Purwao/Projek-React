import { link } from '/reactresto-axios/layout/link.js';
export function del() {
  let id=10;

  link.delete('pelanggan/'+id).then(res=>{
      console.log(res);
      let show=`<h1>${res.data.msg}</h1>`
      show+=`<h1>delete dengan id pelanggan : ${id}</h1>`

      document.getElementById("out").innerHTML=show;
  })
}
