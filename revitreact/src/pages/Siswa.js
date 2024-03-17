import Listsiswa from "./Listsiswa";

function Siswa() {
  let title="SMKN 2 berharap";
  let siswa=['Zahr','Lawrens','Gina'];
    return (
      <div className="App">
       <Listsiswa judul={title} student={siswa}/>
      </div>
    );
  }
  
  export default Siswa;