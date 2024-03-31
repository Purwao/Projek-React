import { link } from '/reactresto-axios/layout/link.js';
export function show() {
  let id = 203;
  link.get("pelanggan/" + id).then((response) => {
      const data = response.data;
      console.log(response.data);
      let tampil = `<table class="table table-bordered w-60 mt-4 text-center">`;
      for (let key in data) {
        tampil += "<tr><th>" + key + "</th><td>" + data[key] + "</td></tr>";
      }
      tampil += "</table>";
      document.getElementById("out").innerHTML = tampil;
    })
    .catch((error) => {
      console.error(error);
    });
}
