import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Casa from "./components/Casa";
import Galeria from "./components/Galeria";
import Footer from "./components/Footer";
import BackgroundWrapper from './components/BackgroundWrapper';
import './index.css';

function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <div className="font-sans min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/casa" element={<Casa />} />
              <Route path="/galeria" element={<Galeria />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BackgroundWrapper>
    </Router>
  );
}

export default App;
