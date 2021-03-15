import React, {useState} from 'react';

import './Weather-box.scss'

function WeatherBox(props) {
 const [location, setLocation]= useState('')
 const [locationKey, setLocationKey] = useState (null)
 const [locationData, setLocationData] = useState (null)
 const [weatherToggle, setWeatherToggle] = useState(false)




  const  onSendLocation =  () =>{
        
          setLocationKey(null)
          setLocationData(null)
         fetch('https://quiet-inlet-52952.herokuapp.com/weathering',{
        // fetch('http://localhost:4000/weathering',{
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
         location:location,
         })
        })
        .then(res => res.json())
        .then(data=> {
        setLocationKey(data.Key)
   })
    fetchWeatherData()
    }
          
        const  fetchWeatherData = async () =>{  
        
            fetch('https://quiet-inlet-52952.herokuapp.com/weatherdata',{
                // fetch('http://localhost:4000/weatherdata',{
             method: 'post',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
             locationKey: locationKey ,
             })
            })
            .then(res => res.json())
            .then(data=> {
                setLocation('')
               setLocationData(data) 
               
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
       
        <form onSubmit={onSubmit}>
       
            <input type="text" placeholder="type location" onChange={onChange}  value={location}/>
            <button id="weather-button" type="submit">Send</button>
        </form> 
        {locationData?
         <div>
       
        <div>
         
        <div>{locationData.WeatherText}</div>
        <span>{locationData.Temperature.Metric.Value} °C</span> 
        </div>
        {/* )} */}
        
        </div>
        :null}
            </div>:null}
        </div>
    );
}

export default WeatherBox;