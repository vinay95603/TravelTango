import React from 'react';
import Navbar from "../Components/Navbar";
import Slide from "../Components/Slide";
import Categories from '../Components/Categories';
import Listings from '../Components/Listings'
import Footer from '../Components/Footer';

function HomePage() {
  return (
    <div>
    <Navbar/>
    <Slide/>
    <Categories/>
    <Listings/>
    <Footer/>
    </div>
  )
}

export default HomePage

