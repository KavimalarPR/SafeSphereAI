import Navbar from "../components/Navbar";


function NearbyPolice() {


  const findPolice = () => {


    if(navigator.geolocation){


      navigator.geolocation.getCurrentPosition(

        (position)=>{


          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;


          const policeMap =
          `https://www.google.com/maps/search/police+station/@${latitude},${longitude},15z`;


          window.open(policeMap, "_blank");


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
          🚓 Nearby Police Stations
        </h1>


        <p>
          Find the nearest police station around you
        </p>



        <button
          className="sos-btn"
          onClick={findPolice}
        >

          Find Police Station

        </button>



      </div>


    </>

  );

}


export default NearbyPolice;