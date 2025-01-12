import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShowPersonajes from './components/showPersonajes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowPersonajes></ShowPersonajes>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
