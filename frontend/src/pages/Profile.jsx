import Navbar from "../components/Navbar";
import { useState } from "react";


function Profile() {


  const savedProfile =
  JSON.parse(localStorage.getItem("profile")) || {};



  const [name,setName] =
  useState(savedProfile.name || "");


  const [email,setEmail] =
  useState(savedProfile.email || "");


  const [phone,setPhone] =
  useState(savedProfile.phone || "");



  const saveProfile = () => {


    const profile = {

      name,
      email,
      phone

    };


    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );


    alert("✅ Profile saved successfully");


  };



  return (

    <>

      <Navbar />


      <div className="dashboard">


        <h1>
          👤 Profile
        </h1>


        <p>
          Manage your personal details
        </p>



        <div className="dashboard-card">


          <input

            placeholder="Enter Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />



          <input

            placeholder="Enter Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

          />



          <input

            placeholder="Enter Phone Number"

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

          />



          <button

            className="sos-btn"

            onClick={saveProfile}

          >

            Save Profile

          </button>



        </div>



      </div>


    </>

  );

}


export default Profile;