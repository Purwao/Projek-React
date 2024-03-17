import { useState } from "react";

function Tentang() 
{
  const [count, setCount] = useState(0);
  function Tambah() {
      setCount(count+1)
  }

  function Kurang() {
      if (count > 0) {
        setCount(count-1)
      }
      if(count <= 0){
        alert ("MENTOK");
      }
  }
    return (
      <div className="App">
          <h1>Tentang Purwao</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, autem.</p>
          <button button type="button" className="btn btn-success" onMouseEnter={Tambah}>+</button>
          <button type="button" className="btn btn-danger" onMouseEnter={Kurang}>-</button>
          <h1>Count={count}</h1>
      </div>
    
    );
  }
  
  export default Tentang;