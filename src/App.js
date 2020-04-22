import React, { useEffect, useState } from 'react';

import{ Cards, Chart, CountryPicker } from './components';
import {fetchData} from './api'
import styles from './App.module.css';
import covidlogo from './images/covid-logo.png'


function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function getData() {
      setData( await fetchData() )
    }
    getData();
  }, []);

  const handleCountry = async (countryProps) => {
    setCountry(countryProps)
  }

  useEffect(() => {
    async function getData() {
      setData( await fetchData(country) )
    }
    getData();
  }, [country]);
  
  return (

    <div className={styles.container}>
      <img className={styles.image} src={covidlogo} alt="logo" />
      <Cards data={data}/>
      <CountryPicker  handleCountry={handleCountry}/>
      <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
