import Navbar from "../components/Navbar";
import { useState } from "react";


function AIAssistant() {


  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);



  const sendMessage = () => {


    if(message.trim()===""){
      return;
    }


    const userMessage = {
      sender:"user",
      text:message
    };


    let aiReply="";


    if(message.toLowerCase().includes("danger")
      || message.toLowerCase().includes("help")
    ){

      aiReply =
      "🚨 If you are in danger, activate SOS and contact your emergency contacts immediately.";

    }

    else if(message.toLowerCase().includes("location")){

      aiReply =
      "📍 You can use Live Location to share your current position.";

    }

    else if(message.toLowerCase().includes("police")){

      aiReply =
      "🚓 Use Nearby Police to find the closest police station.";

    }

    else{

      aiReply =
      "🤖 Stay safe! I can help with emergency situations, location sharing, and safety guidance.";

    }



    const aiMessage = {

      sender:"ai",
      text:aiReply

    };



    setChat([
      ...chat,
      userMessage,
      aiMessage
    ]);


    setMessage("");

  };



  return (

    <>

    <Navbar />


    <div className="dashboard">


      <h1>
        🤖 SafeSphere AI Assistant
      </h1>


      <p>
        Your personal safety companion
      </p>



      <div className="chat-box">


        {
          chat.map((item,index)=>(

            <div key={index}>

              <b>
                {item.sender==="user"
                ?"You:"
                :"AI:"}
              </b>

              <p>
                {item.text}
              </p>


            </div>

          ))
        }


      </div>



      <input

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

        placeholder="Ask me about safety..."

      />



      <button
        className="sos-btn"
        onClick={sendMessage}
      >

        Send

      </button>



    </div>


    </>

  );

}


export default AIAssistant;