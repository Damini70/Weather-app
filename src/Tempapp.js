import React,{useState,useEffect} from "react";
import { FaCloudSun } from "react-icons/fa";
import { FaCloudMoon } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa";


import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Tempapp=()=>{
    const [city,setCity]=useState("");
    const [search,setSearch]=useState("Patna");
    const [sunrise,setSunrise]=useState("");
    const [sunset,setSunset]=useState("");

    useEffect(()=>{
        const fetchApi=async()=>{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${search.toLowerCase()}&units=metric&appid=aeb27f61d4488a9d4cb15f7c89780f63`;
            const response=await fetch(url);
            const resJson=await response.json();
            setCity(resJson.main);
            // console.log(resJson.main);
            const rise=resJson.sys.sunrise;
            const set=resJson.sys.sunset;
            const unix1=parseInt(rise)*1000
            const unix2=parseInt(set)*1000

   
            const date1=new Date(unix1);
            const date2=new Date(unix2);

    // console.log(unix1);
            const time1=date1.toUTCString();
            const time2=date2.toUTCString();
    console.log(time1.slice(-11, -4))
    const r=time1.slice(-11, -4)
    setSunrise(r);
    const s=time2.slice(-11, -4)
    console.log(time2.slice(-11, -4))
    setSunset(s)

            // const date = new Date(*1000);
// console. log(date. toLocaleDateString("en-US"));
            //   console.log(typeof(sun));
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
           <h3 style={{color: "orange"}}>Temp : {city.temp} Celsius</h3> 
           <h3>Min Temp: {city.temp_min} <FaTemperatureHigh style={{color: "skyblue"}}/></h3>
           <h3>Max Temp: {city.temp_max} <FaTemperatureHigh style={{color: "red"}}/></h3>
           <h3 style={{color: "blue"}}><FaCloudRain/>  Humidity: {city.humidity}%</h3>

          <h4><span style={{paddingRight: "3rem"}}><FaCloudSun style={{fontSize: "1.3rem",color: "orange"}}/> Sunrise: {sunrise}</span> <span><FaCloudMoon style={{fontSize: "1.3rem",color: "darkgrey"}}/> Sunset: {sunset} </span>  </h4> 
         

           </div>)}
        
       
        </>
    )
}
export default Tempapp;