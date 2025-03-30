import './App.css'
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetail from './components/ItemDetail/ItemDetail';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ItemListContainer/>} />
          <Route path="/productos/:tipo" element={<ItemListContainer/>} />
          <Route path="/detalle/:id" element={<ItemDetail/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
