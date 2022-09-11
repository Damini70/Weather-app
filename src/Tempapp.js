import React,{useState,useEffect} from "react";
import {WiSunrise} from "react-icons/wi";
import {WiHail} from "react-icons/wi";
import {WiSunset} from "react-icons/wi";
import {WiDayHaze} from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";
import {WiShowers} from "react-icons/wi";
import {WiCloudy} from "react-icons/wi";
import {WiHumidity } from "react-icons/wi";
import {WiStrongWind} from "react-icons/wi";
import {WiTime3} from "react-icons/wi";


import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Tempapp=()=>{
    const [city,setCity]=useState("");
    const [search,setSearch]=useState("Patna");
    const [sun,setSun]=useState({});
    const [weather,setWeather]=useState("");
    const [icon,setIcon]=useState("");
    const [wind,setWind]=useState("");
    const [time,setTime]=useState("");

    useEffect(()=>{
        const fetchApi=async()=>{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${search.toLowerCase()}&units=metric&appid=aeb27f61d4488a9d4cb15f7c89780f63`;
            const response=await fetch(url);
            const resJson=await response.json();
            setCity(resJson.main);
            // console.log(resJson.main);
            const {sunrise,sunset,country}=resJson.sys;
          
            const set=new Date(sunset*1000)
            const rise=new Date(sunrise*1000)

            const settime=`${set.getHours()}:${set.getMinutes()}`
            const risetime=`${rise.getHours()}:${rise.getMinutes()}`
            const data1={settime,risetime,country}
            setSun(data1);
            const {main,description}=resJson.weather[0]
            // console.log(main);
            const wea={main,description};
            setWeather(wea);
            const {speed}=resJson.wind;
            setWind(speed);
            setTime(new Date().toLocaleDateString());
            console.log(time)

            
            
            
        
        };
        fetchApi();
    },[search])
    useEffect(()=>{
        if(weather){
            
            switch (weather.main){
                case "Haze": setIcon(<WiDayHaze/>);
                break;
                case "Clear": setIcon();
                break;
                case "Clouds": setIcon(<WiCloudy/>);
                break;
                case "Rain":setIcon(<WiShowers/>)
                break;
                case "Clear": setIcon("")


            }
        }

    },[weather])


    
   
    return(
        <>
        
        <input type="search"  id="input" placeholder="Type your City" auto="off" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        
       <br/><br/>
        <h1><FaStreetView style={{fontSize: "4rem"}}/> {search}</h1>
        {!city?(<h2>No City Found</h2>):
        (<div>
           <h3>Country : {sun.country}</h3> 
           <h3>{icon} Weather : {weather.main}({weather.description})</h3>
           <h3 style={{color: "orange"}}>Temp : {city.temp} Celsius</h3> 

           <h4><WiStrongWind/> Wind : {wind} m/s</h4>

          <div className="temp">
          <h3 style={{marginRight:"5rem"}}>Min Temp: {city.temp_min}  <FaTemperatureHigh style={{color: "skyblue"}}/></h3>
           <h3>Max Temp: {city.temp_max}  <FaTemperatureHigh style={{color: "red"}}/></h3>
          </div><hr/>

           <div className="extra">
            <h3 style={{color: "aqua",marginRight:"5rem"}}><WiHumidity style={{fontSize: "2rem"}}/>  Humidity: {city.humidity}%</h3>
           <h3 style={{color: "aqua"}}><WiHail style={{fontSize: "2rem"}}/> Pressure: {city.pressure} hPa</h3>
           </div><hr/>

         <div className="time">
         <h4><span ><WiSunrise style={{fontSize: "1.9rem",color: "red"}}/> Sunrise: {sun.risetime}</span> <span><WiSunset style={{fontSize: "1.9rem",color: "darkorange"}}/> Sunset: {sun.settime} </span> 
          <span><WiTime3 style={{fontSize: "1.9rem",color: "pink"}}/>Day: {time}</span> </h4> 
         </div>
         </div>)}
        
       
        </>
    )
}
export default Tempapp;