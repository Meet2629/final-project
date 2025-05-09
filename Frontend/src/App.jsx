import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './components/HomePage';
import AuthForm from './components/AuthForm';
import AIpathway from './pages/AIpathway';
import Careers from './pages/Careers';
import MagazinePage from './pages/MagazinePage';
import CareerAptitudeTest from './pages/CareerAptitudeTest';
import Docgame1 from './pages/Docgame1';
import Lawgame1 from './pages/Lawgame1';
import Engineergame1 from './pages/Engineergame1';
import Cagame1 from './pages/Cagame1';
import Csgame1 from './pages/Csgame1';
import InteriorDesigngame1 from './pages/InteriorDesigngame1';
import Archgame1 from './pages/Archgame1';
import Writergame1 from './pages/Writergame1';

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar component */}
      <Navbar />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/ai-pathway" element={<AIpathway />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/CareerAptitudeTest" element={<CareerAptitudeTest />} />
        <Route path="/MagazinePage" element={<MagazinePage />} />
        <Route path="/Docgame1" element={<Docgame1 />} />
        <Route path="/Lawgame1" element={<Lawgame1 />} />
        <Route path="/Engineergame1" element={<Engineergame1 />} />
        <Route path="/Cagame1" element={<Cagame1 />} />
        <Route path="/Csgame1" element={<Csgame1 />} />
        <Route path="/InteriorDesigngame1" element={<InteriorDesigngame1 />} />
        <Route path="/Archgame1" element={<Archgame1 />} />
        <Route path="/Writergame1" element={<Writergame1 />} />
      </Routes>
    </BrowserRouter>
  );
}
