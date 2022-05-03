import axios from "axios";
import { useEffect,useState } from "react";

const ShowView = ({country}) => {
  const [show,setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }
  if(show){
    return (<div>
      {country.name.common}
      <button onClick={handleClick}>show</button>
      <p>capital {country.capital[0]} </p> <p>area {country.area}</p> <p>languages:{Object.values(country.languages).map(language=><li key={language}>{language}</li>)}</p> <img src={country.flags.png}/>
  </div>)
  }else{
    return (
      <div>
        {country.name.common}
        <button onClick={handleClick}>show</button>
      </div>
    )
  }
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_NOT_SECRET_CODE;

  console.log(weather);
  console.log(api_key);
  useEffect(()=>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
      .then(response=>{
        setWeather(response.data.weather[0])
      })
  },[])

  return(
    <div>
      <h2>weather in {capital}</h2>
      
      <img src={`http://openweathermap.org/img/wn/10d@${weather.icon}.png`}/>
      {weather.main} {weather.description}
    </div>
  )
}
const App =() => {
  const [countries,setCountries] = useState([])
  const [searchValue,setSearchValue] = useState('')
  const [button,setButton] = useState('show')



  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setCountries(response.data)
      })
  },[])


  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  
 const newCountriesArr= countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase()))  

 return (
    <div>
      find countries<input value={searchValue} onChange={handleChange} />
      {newCountriesArr.length>10? <p>Too many matches, specify another filter</p>:(newCountriesArr.length==1?<><p>{newCountriesArr[0].name.common}</p> <p>capital {newCountriesArr[0].capital[0]} </p> <p>area {newCountriesArr[0].area}</p> <p>languages:{Object.values(newCountriesArr[0].languages).map(language=><li key={language}>{language}</li>)}</p> <img src={newCountriesArr[0].flags.png}/><Weather capital={newCountriesArr[0].capital[0]} /></>:newCountriesArr.map(country=><ShowView key={country.name.common} country={country} />))}
    </div> 
  );
}

export default App;
