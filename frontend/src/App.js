import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './componentes/Menu';
import Funcionarios from './pages/Funcionarios';
import CriarFuncionario from './pages/Funcionarios/store';
import Duplas from './pages/Duplas';
import CriarDupla from './pages/Duplas/store';
import Home from './pages/home';
import NotFound from './pages/notFound';


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/funcionarios/create" element={<CriarFuncionario />} />
        <Route path="/duplas" element={<Duplas />} />
        <Route path="/duplas/create" element={<CriarDupla />} />
        {/* Rota de erro 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
