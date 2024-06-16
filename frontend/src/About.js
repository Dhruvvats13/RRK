import React from 'react';
import Navbar2 from './Navbar2';
import './About.css';
import { Link } from "react-router-dom";


const About = () => {
   
  return (

      <div className='Main-div'>
        <Link className="navbar-brand fs-1 fst-italic" to="/">
        <Navbar2 className='navbar' />
        </Link>
        <div className='auth-form-container'>
        <form className='about-form'>
       <p className='para'> 
       Welcome to RomRomKitchen, the ultimate destination for delicious and nourishing Indian food. Our food ordering website is dedicated to providing you with top-notch quality meals that promote a healthy lifestyle.
<br/>
<br/>
At RomRomKitchen, we firmly believe that good food has the power to bring people together. With our carefully curated menu of authentic Indian cuisine, we take pride in using fresh, locally sourced ingredients to create flavorful dishes that cater to a variety of tastes.
<br/>
<br/>
What sets us apart is our unwavering commitment to quality. We prioritize the use of wholesome ingredients, steer clear of artificial additives, and ensure that our meals are prepared with utmost care and hygiene. Our skilled team of chefs passionately crafts each dish, infusing them with the authentic flavors and traditional cooking techniques of India.
<br/>
<br/>
Understanding that each customer has unique dietary preferences, we offer a diverse menu that accommodates various needs. From vegetarian and vegan options to gluten-free and dairy-free alternatives, we aim to satisfy everyone's requirements without compromising on taste or quality.
<br/>
<br/>
Convenience is key to our service. With our user-friendly website, you can effortlessly browse our menu, customize your order, and track its progress until it arrives at your doorstep. We prioritize timely deliveries to maintain the freshness and flavors of our dishes.
<br/>
<br/>
Your satisfaction is our utmost priority. We value your feedback and continually strive to enhance our services. Whether you're ordering for yourself, your family, or hosting an event, RomRomKitchen is here to make your dining experience unforgettable.
<br/>
<br/>
So, sit back, relax, and let us bring the flavors of India to your home. Embark on a culinary journey filled with taste, wellness, and joy with RomRomKitchen.
<br/>
<br/>
      </p>
      </form>
      </div>
        </div>
       


  );
};

export default About;
