import Navbar from "../components/Navbar";


function NearbyHospitals() {


  const findHospitals = () => {


    if(navigator.geolocation){


      navigator.geolocation.getCurrentPosition(

        (position)=>{


          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;


          const hospitalMap =
          `https://www.google.com/maps/search/hospital/@${latitude},${longitude},15z`;


          window.open(hospitalMap,"_blank");


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
          🏥 Nearby Hospitals
        </h1>


        <p>
          Find hospitals near your current location
        </p>



        <button
          className="sos-btn"
          onClick={findHospitals}
        >

          Find Nearby Hospitals

        </button>



      </div>


    </>

  );

}


export default NearbyHospitals;