import React, {useState} from 'react';

import './Weather-box.scss'

function WeatherBox(props) {
 const [location, setLocation]= useState('')
 const [locationKey, setLocationKey] = useState ('')
 const [locationData, setLocationData] = useState ([])
 const [weatherToggle, setWeatherToggle] = useState(false)




  const  onSendLocation =() =>{
        fetch('http://localhost:4000/weathering',{
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
         location:location,
         })
        })
        .then(res => res.json())
        .then(data=> {
         if(data) {
          setLocationKey(data)
          fetchWeatherData()
       
         }
          })}
          
        const  fetchWeatherData =() =>{
            fetch('http://localhost:4000/weatherdata',{
             method: 'post',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
             locationKey: locationKey ,
             })
            })
            .then(res => res.json())
            .then(data=> {
             if(data) {
              setLocationData(data)
              console.log(locationData)
             }
              })}
            
        
  const onChange = (event) => {
    setLocation(event.target.value)
    }

 const onSubmit=(event) => {
        event.preventDefault();
        onSendLocation()
    }

    const toggleWeather= () => {
        setWeatherToggle(!weatherToggle)
    }
            
return (
       <div>
        <h4 id="weather-title" onClick={toggleWeather}>Get current weather
        </h4>
       
        { weatherToggle?
        <div className='weather-container'>
        {locationData?
         <div>
        <div>{locationData}it is sunny</div>
        <span>tempweather</span> 
        
        </div>
        :null}
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="type location" onChange={onChange}/>
            <button id="weather-button" type="submit">Send</button>
            <span >won't work if over 50 reqs a day</span>
        </form>
            </div>:null}
        </div>
    );
}

export default WeatherBox;