import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import CareerAptitudeTest from './../pages/CareerAptitudeTest'; // (Optional - may be unused)


const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Auth');
  };

  return (
    <nav className="navbar">
      <div className="logo">Career Gen</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/Careers">Careers</a></li>
        <li><a href="/AIPathway">AI Pathway</a></li>
        <li><a href="/CareerAptitudeTest">Career Aptitude Test</a></li>
        <li><a href="/MagazinePage">Magazine</a></li> 
        <li><a href="#">Contact</a></li>
      </ul>
      <button className="nav-btn" onClick={handleLoginClick}>Login and Signup</button>
    </nav>
  );
};

export default Navbar;
