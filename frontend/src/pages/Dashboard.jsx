import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();


  const handleSOS = () => {

    const savedContacts =
      JSON.parse(localStorage.getItem("contacts")) || [];


    if(savedContacts.length === 0){

      alert("❌ No emergency contacts added!");
      return;

    }



    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition(

        (position)=>{


          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;


          const mapLink =
          `https://www.google.com/maps?q=${latitude},${longitude}`;
          const oldHistory =
JSON.parse(localStorage.getItem("sosHistory")) || [];


const newSOS = {

 date: new Date().toLocaleString(),

 location: mapLink

};


localStorage.setItem(
"sosHistory",
JSON.stringify([
 ...oldHistory,
 newSOS
])
);



          let message =
          "🚨 EMERGENCY ALERT 🚨\n\n"
          + "I need help!\n\n"
          + "My Location:\n"
          + mapLink
          + "\n\nContacts notified:\n";



          savedContacts.forEach(contact=>{

            message += 
            `${contact.name} - ${contact.phone}\n`;

          });



          alert(message);


        },


        ()=>{

          alert("❌ Unable to get location");

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
          SafeSphere Dashboard
        </h1>


        <p>
          Welcome back 👋
        </p>



        <div className="dashboard-grid">



          {/* Emergency SOS */}

          <div
            className="dashboard-card"
            onClick={handleSOS}
          >

            🚨

            <h3>
              Emergency SOS
            </h3>

          </div>





          {/* Emergency Contacts */}

          <div
            className="dashboard-card"
            onClick={() => navigate("/contacts")}
          >

            👥

            <h3>
              Emergency Contacts
            </h3>

          </div>





          {/* Live Location */}

          <div
  className="dashboard-card"
  onClick={() => navigate("/live-location")}
>

  📍

  <h3>
    Live Location
  </h3>

</div>




          {/* Nearby Police */}

          {/* Nearby Police */}

<div
 className="dashboard-card"
 onClick={()=>navigate("/nearby-police")}
>

  🚓

  <h3>
    Nearby Police
  </h3>

</div>




          {/* Nearby Hospitals */}
        {/* Nearby Hospitals */}

<div
 className="dashboard-card"
 onClick={()=>navigate("/nearby-hospitals")}
>

🏥

<h3>
Nearby Hospitals
</h3>

</div>




          {/* AI Assistant */}

          <div
 className="dashboard-card"
 onClick={()=>navigate("/ai-assistant")}
>

🤖

<h3>
AI Assistant
</h3>

</div>




          {/* SOS History */}

          {/* SOS History */}

<div
 className="dashboard-card"
 onClick={()=>navigate("/sos-history")}
>

📜

<h3>
SOS History
</h3>

</div>





          {/* Profile */}

          {/* Profile */}

<div
 className="dashboard-card"
 onClick={()=>navigate("/profile")}
>

⚙️

<h3>
Profile
</h3>

</div>



        </div>


      </div>


    </>

  );

}


export default Dashboard;