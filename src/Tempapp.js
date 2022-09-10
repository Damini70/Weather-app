import React,{useState,useEffect} from "react";
import {WiSunrise} from "react-icons/wi";
import {WiHail} from "react-icons/wi";
import {WiSunset} from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";

import {WiRaindrop } from "react-icons/wi";


import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Tempapp=()=>{
    const [city,setCity]=useState("");
    const [search,setSearch]=useState("Patna");
    const [sun,setSun]=useState({});
    // const [sunset,setSunset]=useState("");

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
            setSun(data1)

            
        
        };
        fetchApi();
    },[search])
    
   
    return(
        <>
        
        <input type="search"  id="input" placeholder="Type your City"  value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        
       <br/><br/>
        <h1><FaStreetView style={{fontSize: "4rem"}}/> {search}</h1>
        {!city?(<h2>No City Found</h2>):
        (<div>
           <h3>Country : {sun.country}</h3> 
           <h3 style={{color: "orange"}}>Temp : {city.temp} Celsius</h3> 
          <div className="temp">
          <h3 style={{marginRight:"5rem"}}>Min Temp: {city.temp_min}  <FaTemperatureHigh style={{color: "skyblue"}}/></h3>
           <h3>Max Temp: {city.temp_max}  <FaTemperatureHigh style={{color: "red"}}/></h3>
          </div>
           <div className="extra">
            <h3 style={{color: "aqua",marginRight:"5rem"}}><WiRaindrop style={{fontSize: "2rem"}}/>  Humidity: {city.humidity}%</h3>
           <h3 style={{color: "aqua"}}><WiHail style={{fontSize: "2rem"}}/> Pressure: {city.pressure} hPa</h3>
           </div>

          <h4><span style={{paddingRight: "3rem"}}><WiSunrise style={{fontSize: "1.3rem",color: "orange"}}/> Sunrise: {sun.risetime}</span> <span><WiSunset style={{fontSize: "1.3rem",color: "darkgrey"}}/> Sunset: {sun.settime} </span>  </h4> 


         

           </div>)}
        
       
        </>
    )
}
export default Tempapp;