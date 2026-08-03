import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";


function SOSHistory() {


  const [history, setHistory] = useState([]);



  useEffect(()=>{


    const savedHistory =
    JSON.parse(localStorage.getItem("sosHistory")) || [];


    setHistory(savedHistory);


  },[]);



  return (

    <>

      <Navbar />


      <div className="dashboard">


        <h1>
          📜 SOS History
        </h1>


        <p>
          Previous emergency alerts
        </p>



        {
          history.length === 0 ?

          (

            <div className="dashboard-card">

              <h3>
                No SOS alerts yet
              </h3>

              <p>
                Your emergency history will appear here.
              </p>

            </div>

          )


          :

          (

            history.map((item,index)=>(


              <div 
                className="dashboard-card"
                key={index}
              >

                <h3>
                  🚨 SOS Alert #{index+1}
                </h3>


                <p>
                  Date:
                  {item.date}
                </p>


                <p>
                  Location:
                </p>


                <a
                  href={item.location}
                  target="_blank"
                  rel="noreferrer"
                >

                  View Location

                </a>


              </div>


            ))

          )

        }



      </div>


    </>

  );

}


export default SOSHistory;