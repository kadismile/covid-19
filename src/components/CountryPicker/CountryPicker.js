import React, {useState, useEffect} from 'react'
import { NativeSelect, FormControl} from '@material-ui/core'
import {fetchCountries} from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountry}) => {
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    async function getCountries() {
      setCountries( await fetchCountries() )
    }
    getCountries();
  }, []);

  return (
    
   <FormControl className={styles.formControl}>
     <NativeSelect defaultValue="" onChange={(e)=> {handleCountry(e.target.value)}}>
       <option value="global">Global</option>
      {countries.map((country, i)=> 
        <option value={country} key={i}>{country}</option>
      )}
     </NativeSelect>
   </FormControl>
  )
}

export default CountryPicker