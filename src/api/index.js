import axios from 'axios'

let url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  if (country && country !== 'global') {
    url = `${url}/countries/${country}`
  }

  try {
  const {data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url)
  url = 'https://covid19.mathdro.id/api'
   return  { confirmed,recovered,deaths,lastUpdate }

  } catch (error) {
    console.log("ERROR", error)
  }

}

export const fetchDailydata = async () => {
  try { 
    const {data} = await axios.get(`${url}/daily`) 

    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      death: dailyData.deaths.total,
      date: dailyData.reportDate
    }))

  
  } catch (error) {
    console.log(error)
  }
}

export const fetchCountries = async () => {
  try {
    const {data: {countries} } = await axios.get(`${url}/countries`)
    return countries.map((country)=> country.name)
  } catch (error) {
    
  }
}