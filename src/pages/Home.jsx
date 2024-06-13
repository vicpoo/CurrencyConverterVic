import React from 'react';
import CurrencyConverter from '../components/organisms/CurrencyConverter';
import Header from '../components/organisms/Header';


const Home = () => {
  return (
    <div>
      <Header></Header>
      <CurrencyConverter />
    </div>
  );
};  

export default Home;