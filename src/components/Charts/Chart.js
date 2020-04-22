import React, {useState, useEffect} from 'react'
import {fetchDailydata} from '../../api'
import {Line, Bar} from 'react-chartjs-2'

import styles from './Chart.module.css'

const Charts = ({ data: {confirmed, deaths, recovered}, country}) => {
  const [ dailyData, setDailyData ] = useState([]);

  useEffect(() => {
    async function getData() {
      setDailyData( await fetchDailydata() )
    }
    getData();
  }, []);

  const lineChart = (
    dailyData.length ?
    <Line 
      data={{
        labels: dailyData.map(({date}) => date),
        datasets: [{
          data: dailyData.map(({ confirmed }) => confirmed),
          label: "Confirmed",
          borderColor: "#3333ff",
          fill: true
        }, {
          data: dailyData.map(({ death }) => death),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true
        }]
      }}
   /> :
   null
  )

  const barChart = (
    confirmed ? 
    (<Bar 
      data= {{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0, 0, 255, 0.5 )',
            'rgba(0, 255,0,0.5)',
          ],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      }}
      options= {{
        legend: {display: false},
        title: {display: true, text: `Current State in ${country}`}
      }}
    />) : null
  )
  
  return (
    <div className={styles.container}>
     {country && country !== 'global' ? barChart : lineChart}
    </div>
  )
}

export default Charts