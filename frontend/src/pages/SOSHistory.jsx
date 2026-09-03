import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";


function SOSHistory() {


  const [history, setHistory] = useState([]);



  useEffect(() => {


    const fetchHistory = async () => {


      const user = auth.currentUser;



      if(user){


        try{


          const q = query(

            collection(
              db,
              "users",
              user.uid,
              "sosHistory"
            ),

            orderBy(
              "createdAt",
              "desc"
            )

          );



          const snapshot = await getDocs(q);



          const sosData = snapshot.docs.map(doc => ({

            id: doc.id,

            ...doc.data()

          }));



          setHistory(sosData);



        }

        catch(error){

          console.log(error);

        }


      }


    };



    fetchHistory();


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
                key={item.id}
              >



                <h3>
                  🚨 SOS Alert #{index+1}
                </h3>




                <p>
                  Status: {item.status}
                </p>




                <p>
                  Latitude: {item.latitude}
                </p>



                <p>
                  Longitude: {item.longitude}
                </p>




                <p>
                  Date:

                  {
                    item.createdAt
                    ?
                    item.createdAt.toDate().toLocaleString()
                    :
                    "Saving..."
                  }

                </p>




                <a
                  href={item.location}
                  target="_blank"
                  rel="noreferrer"
                >

                  📍 View Location

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