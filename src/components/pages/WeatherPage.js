import React from 'react';
import '../../components/Weather.css'
import { useEffect, useState } from "react";
import Weather from '../Weather';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function WeatherPage() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  return <div className="App">
  {(typeof data.main != 'undefined') ? (
    <Weather weatherData={data}/>
  ): (
    <div>
      <Dimmer active>
        <Loader>Loading..</Loader>
      </Dimmer>
   </div>
 )}
</div>
}