import { link } from "/reactresto-axios/layout/link.js";
export function update() {
  let data = {
    pelanggan: "Lawrens",
    alamat: "Mondcity",
    telp: "020205132342",
  };
  let id = 207;

  link.put(`pelanggan/` + id, data).then((res) => {
    console.log(res);
    let show = `<h1>${res.data.msg}</h1>`;
    show += `<h1>mengupdate data dengan id=${id}</h1>`;

    document.getElementById("out").innerHTML = show;
  });
}
