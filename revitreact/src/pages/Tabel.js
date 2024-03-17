import Menu from "./Menu";

function Tabel(props) {
    let menu=props.menu;
    let title=props.title;
    return (
      <div className="App">
         <marquee direction="left"><h1>{title}</h1></marquee>
        <div >
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <td>Nama Menu</td>
                        <td>Harga Menu</td>
                        <td>Tipe Menu</td>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((data)=>(
                        <tr key={data.idmenu}>
                                <td>{data.menu}</td>
                                <td>{data.harga}</td>
                                <td>{data.tipe}</td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
      

  
  
  export default Tabel;
