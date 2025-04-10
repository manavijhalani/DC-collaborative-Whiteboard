import react from 'react'
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import Front from './Front';
import WhiteBoard from './WhiteBoard'

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Front/>}></Route>
      <Route path='/whiteboard' element={<WhiteBoard/>}></Route>

    </Routes>
    </BrowserRouter>

  );
}