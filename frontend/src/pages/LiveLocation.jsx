import Navbar from "../components/Navbar";
import { useState } from "react";


function LiveLocation() {


  const [location, setLocation] = useState(null);



  const getLocation = () => {


    if(navigator.geolocation){


      navigator.geolocation.getCurrentPosition(

        (position)=>{


          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;



          setLocation({

            latitude,
            longitude

          });


        },


        ()=>{

          alert("❌ Unable to get your location");

        }


      );


    }
    else{

      alert("❌ Geolocation is not supported");

    }


  };



  return (

    <>


      <Navbar />


      <div className="dashboard">


        <h1>
          📍 Live Location
        </h1>


        <p>
          View your current location
        </p>



        <button
          className="sos-btn"
          onClick={getLocation}
        >

          Get My Location

        </button>



        {
          location &&

          (

            <div className="dashboard-card">


              <h3>
                Current Location
              </h3>


              <p>
                Latitude:
                {location.latitude}
              </p>


              <p>
                Longitude:
                {location.longitude}
              </p>



              <a
                href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                target="_blank"
                rel="noreferrer"
              >

                Open in Google Maps

              </a>


            </div>

          )

        }



      </div>


    </>

  );

}


export default LiveLocation;