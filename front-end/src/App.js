import './App.css';
import Nav from './component/nav';
import Footer from './component/footer';
import SignUp from './component/signup';
import PrivateRoute from './component/privateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import AddProduct from './component/addproduct';
import ProductList from './component/productList';
import EditProduct from './component/editproduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateRoute/>}>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<EditProduct/>}/>
        {/* <Route path='/logout' element={<h1>Signout component</h1>}/> */}
        <Route path='/profile' element={<h1>Profile component</h1>}/>
        </Route>

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
