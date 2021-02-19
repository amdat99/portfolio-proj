import React, {useState} from 'react';

import './Weather-box.scss'

function WeatherBox(props) {
 const [location, setLocation]= useState('')
 const [locationKey, setLocationKey] = useState (null)
 const [locationData, setLocationData] = useState (null)
 const [weatherToggle, setWeatherToggle] = useState(false)




  const  onSendLocation = async () =>{
         setLocationData(null)
         setLocationKey(null)
        fetch('https://quiet-inlet-52952.herokuapp.com/weathering',{
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
         location:location,
         })
        })
        .then(res => res.json())
        .then(data=> {
         if(data) {
          setLocationKey(data.Key)
          fetchWeatherData()
          console.log(locationKey)
       
         }
          })}
          
        const  fetchWeatherData =() =>{
            fetch('https://quiet-inlet-52952.herokuapp.com/weatherdata',{
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

              
             }
              })}

              if(locationData){
                  console.log(locationData)
              }
            
        
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
        <div>{locationData.WeatherText}</div>
        <span>{locationData.Temperature.Metric.Value} °C</span> 
        
        </div>
        :null}
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="type location" onChange={onChange}/>
            <button id="weather-button" type="submit">Send</button>
            <span id='weather-warning-text'>won't work if over 50 reqs a day</span>
        </form>
            </div>:null}
        </div>
    );
}

export default WeatherBox;