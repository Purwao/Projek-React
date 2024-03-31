import { link } from '/reactresto-axios/layout/link.js';
export function get() {

    link.get('/pelanggan').then(res => {
            console.log(res);

        let tampil = `<table class="table">
                <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Alamat</th>
                    <th>Telp</th>
                </tr>
            `;

        res.data.forEach(el => {
            tampil += `<tr>
                    <td>${el.idpelanggan}</td>
                    <td>${el.pelanggan}</td>
                    <td>${el.alamat}</td>
                    <td>${el.telp}</td>
                </tr>`;
        });

        tampil += `</table>`;

        document.getElementById('out').innerHTML = tampil;

    });
}