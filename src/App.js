import React from 'react';
import logo from './logo.svg';

import './css/style.css'

// Import external stylesheets
import './lib/animate/animate.min.css'; // Animation library styles
import './lib/owlcarousel/assets/owl.carousel.min.css'; // Owl Carousel styles
import './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'; 

// Import external icon fonts
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome icons
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import Login from './Components/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Info from './Components/Info';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Welcome from './Components/Blogs/Welcome';
import AddTrip from './Components/Trips/AddTrip';
import TripHome from './Components/Trips/TripHome';
import Addproduct from './Components/Addproduct';
import CardProduct from './Components/CardProduct';
import ProductListAdmin from './Components/ProductListAdmin';
import Editproduct from './Components/Editproduct';
import CartItems from './Components/CartItems';
import AddTripGenerique from './Components/Trips/AddTripGenerique';
import MarketPlace from './Components/MarketPlace';
import ProductsList from './Components/ProductsList';
import BlogDetails from './Components/BlogDetails';
import SavedProducts from './Components/SavedProducts';
import CommandeValidate from './Components/CommandeValidate';
import CommandList from './Components/CommandList';
import MesCommandes from './Components/MesCommandes';
import Forum from './Components/Forum';

import Profile from './Components/Profile'; 
import UserProfile from './Components/UserProfile'; 
import RequestList from './Components/RequestList';
function App() {
  return (
    <div className="App">
      <header>
        <meta charset="utf-8" />
        <title>Tourist - Travel Agency HTML Template</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="keywords" />
        <meta content="" name="description" />

        {/* Favicon */}
        <link href="img/favicon.ico" rel="icon" />

        

        {/* Google Web Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
     <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,800;1,200&family=Syne&display=swap" rel="stylesheet"></link>
     <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap" rel="stylesheet"></link>     
     <link href="https://fonts.googleapis.com/css2?family=Lora:ital@1&display=swap" rel="stylesheet"></link>
     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap" rel="stylesheet"></link>
     <link href="https://fonts.googleapis.com/css2?family=Volkhov:wght@700&display=swap" rel="stylesheet"></link>
        {/* Icon Font Stylesheet */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

        {/* Libraries Stylesheet */}
        <link href="lib/animate/animate.min.css" rel="stylesheet" />
        <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

        {/* Customized Bootstrap Stylesheet */}
        <link href="css/bootstrap.min.css" rel="stylesheet" />

        {/* Template Stylesheet */}
        <link href="css/style.css" rel="stylesheet" />
        

        <Router>
        {/*<Navbar /> */ }
        {/* <Info /> */}

        <div>
          <Routes>
          
          <Route path='/Login' element={<Login />} ></Route>
          <Route path='/SignUp' element={<SignUp />} ></Route>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/Welcome' element={<Welcome />} ></Route>
          <Route path='/Trips/Add' element={<AddTrip/>}></Route>
          <Route path='/Trips/Add2' element={<AddTripGenerique/>} ></Route>
          <Route path='/Trips' element={<TripHome/>}></Route>
          <Route path='/addProduct' element={<Addproduct/>} ></Route>
          <Route path='/Listproducts' element={<CardProduct/>} ></Route>
          <Route path='/ListproductsAdmin' element={<ProductListAdmin/>} ></Route>
          <Route path="/edit-product/:id" element={<Editproduct />} />
          <Route path="/Cart" element={<CartItems />} />
          <Route path="/MarketPlace" element={<MarketPlace/>} />
          <Route path="/Products" element={<ProductsList/>} />
          <Route path="/Blog" element={<BlogDetails/>} />
          <Route path="/Saved" element={<SavedProducts/>} />
          <Route path="/CommandeValidate" element={<CommandeValidate />} />
          <Route path="/Commandes" element={<CommandList />} />
          <Route path="/MesCommandes" element={<MesCommandes/>} />
          <Route path='/Forum' element={<Forum/>} />

          <Route path='/profile' element={<Profile />} ></Route>
          <Route path='/Userprofile/:userId' element={<UserProfile />} ></Route>
          <Route path="/travel-requests"  element={<RequestList />} ></Route>
    
          </Routes>
        </div> 
      </Router>
      
      {/* <Footer /> */ }

        
      </header>
    </div>
  );
}

export default App;