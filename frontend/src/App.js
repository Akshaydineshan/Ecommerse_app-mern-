
import './App.css';
import Header from './Components/Home/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/Home/About';
import ProductDetails from './Components/Products/ProductDetails';


function App() {
  return (
  
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
      </Routes>
      </BrowserRouter>


     
    
     
    
    
   
  );
}

export default App;
