import React from 'react'

import HeroSection from '../Landing_Page_Components/HeroSection';
import PixelatedFeatures from '../Landing_Page_Components/PixelatedFeatures';
import ProductivitySuite from '../Landing_Page_Components/ProductivitySuite';
import FreeForeverCTA from '../Landing_Page_Components/FreeForeverCTA';
import Allyouneed from '../Landing_Page_Components/Allyouneed';
import ReadyCTA from '../Landing_Page_Components/ReadyCTA';
import { HomePageMissionCard } from '../Landing_Page_Components/HomePageMissionCard';
import Footer from './Footer';

const Home = () => (

  
  <div>
    
    <HeroSection />
    <PixelatedFeatures />
    <HomePageMissionCard/>
    <ProductivitySuite />
    <FreeForeverCTA />
    <Allyouneed />
    <ReadyCTA/>
    <Footer/>
  </div>
);

export default Home
