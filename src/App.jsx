import Header from './components/Header';
import BackgroundWrapper from './components/BackgroundWrapper';
import Home from './components/Home';
import './index.css';

function App() {
  return (
    <BackgroundWrapper>
      <div className="font-sans">
        <Header />
        <main>
          <Home />
        </main>
      </div>
    </BackgroundWrapper>
  );
}

export default App;
