import { Link } from "react-router-dom";


function Nav() {
  return (
    <div className="App">
      <ul className="text-light">
      <Link to='/'><li>Homepage</li></Link>
      <Link to='/kontak'><li>Kontak</li></Link>
      <Link to='/sejarah'><li>Sejarah</li></Link>
      <Link to='/tentang'><li>Tentang</li></Link>
      <Link to='/siswa'><li>Siswa</li></Link>
      <Link to='/menu'>Menu</Link>
      </ul>
    </div>
  );
}

export default Nav;