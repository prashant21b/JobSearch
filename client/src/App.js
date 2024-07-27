
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from './pages/Home';
import Navbar from './components/Navbar';
import  Singup  from './pages/Signup';
import  Login  from './pages/Login';
import { ManagePost } from './pages/ManagePost';

function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/singup' element={<Singup/>}></Route>
    <Route path='/login'element={<Login/>}></Route>
    <Route path='/manage' element={<ManagePost/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
