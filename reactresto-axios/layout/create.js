import { link } from "/reactresto-axios/layout/link.js";
export function create() {
  let datapelanggan = {
    pelanggan: "Firefly",
    alamat: "Stellaron Hunter",
    telp: "09812443",
  };

  link.post("/pelanggan", datapelanggan).then((response) => {
    // console.log(response.data);
    // console.log(response.data.msg);

    let show = `<h1>${response.data.msg}</h1>`;
    show += `<h1>dengan nama pelanggan : ${response.data.data.pelanggan}</h1>`;

    document.getElementById("out").innerHTML = show;
  });
}
