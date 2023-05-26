import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from './components/NotFound';
import Catalog from './components/Catalog';
import Details from './components/Details';
import New from './components/New';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <Routes>
            <Route
              exact
              path="/"
              element={<Catalog />} 
            />
            <Route
              exact
              path="/details/:itemid"
              element={<Details />} 
            />
            <Route
              exact
              path="/new-item"
              element={<New />} 
            />
            <Route
              exact
              path="*"
              element={<NotFound />} 
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
