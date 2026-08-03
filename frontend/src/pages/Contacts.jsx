import Navbar from "../components/Navbar";
import { useState } from "react";

function Contacts() {

  const [contacts, setContacts] = useState(
  JSON.parse(localStorage.getItem("contacts")) || []
);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");



  const addContact = () => {

    if (name === "" || phone === "") {

      alert("Please enter name and phone number");
      return;

    }


    const newContact = {

      id: Date.now(),
      name: name,
      phone: phone

    };


    const updatedContacts = [...contacts, newContact];

setContacts(updatedContacts);

localStorage.setItem(
  "contacts",
  JSON.stringify(updatedContacts)
);

    setName("");
    setPhone("");

  };





  const deleteContact = (id) => {

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );


    setContacts(updatedContacts);

localStorage.setItem(
  "contacts",
  JSON.stringify(updatedContacts)
);

  };





  const callContact = (phoneNumber) => {

    window.location.href = `tel:${phoneNumber}`;

  };





  return (

    <>

      <Navbar />


      <div className="contacts-page">


        <h1>
          👥 Emergency Contacts
        </h1>


        <p>
          Add trusted people who can help you during emergencies.
        </p>





        <div className="contact-form">


          <input

            type="text"

            placeholder="Contact Name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />




          <input

            type="tel"

            placeholder="Phone Number"

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

          />




          <button onClick={addContact}>

            Add Contact

          </button>



        </div>






        <div className="contact-list">


          {

            contacts.map((contact)=>(


              <div 
                className="contact-card"
                key={contact.id}
              >



                <h3>
                  {contact.name}
                </h3>



                <p>
                  📞 {contact.phone}
                </p>





                <button

                  onClick={() => callContact(contact.phone)}

                >

                  Call

                </button>





                <button

                  onClick={() => deleteContact(contact.id)}

                >

                  Delete

                </button>



              </div>


            ))

          }


        </div>



      </div>


    </>

  );

}


export default Contacts;