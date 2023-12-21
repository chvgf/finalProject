import './App.css';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './css/global';
import Main from './pages/Main';
import Shop from './pages/Shop';
import Community from './pages/Community';


function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Main />} >
          <Route path='/' element={<Community />} />
          <Route path='/shop' element={<Shop/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
