function Listsiswa(props) {
  let array= props.student.map(
    (item,i)=>
      
        <div className="card w-25 p-3">
            <div className="card-body">
                  <h5 className="card-title">{i}, {item}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
      
  )
    return (
      <div className="App">
            <h1>Siswa</h1>
            <h2>{props.judul}</h2>
               <div className="d-flex flex-row mb-3">
                  <h3>{array}</h3>
               </div>
      </div>
    );
  }
  
  export default Listsiswa;