import './App.css';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './css/global';
import Main from './pages/Main';
import Shop from './pages/Shop';
import Community from './pages/Community';
import Toktok from './components/commnunity/Toktok';
import ShopDetail from './components/shop/ShopDetail';


function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Main />} >
          <Route path='/' element={<Community />} />
          <Route path='/community/Toktok' element={<Toktok />} />
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/detail' element={<ShopDetail/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
