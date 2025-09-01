import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundWrapper from './components/BackgroundWrapper';
import './index.css';

// Lazy loading de componentes não-críticos
const Home = lazy(() => import("./components/Home"));
const Casa = lazy(() => import("./components/Casa"));
const Galeria = lazy(() => import("./components/Galeria"));

// Loading component otimizado
const Loading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <div className="font-sans min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/casa" element={<Casa />} />
                <Route path="/galeria" element={<Galeria />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BackgroundWrapper>
    </Router>
  );
}

export default App;
