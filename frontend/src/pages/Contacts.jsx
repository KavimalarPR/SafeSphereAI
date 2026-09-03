import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./Contacts.css";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    const contactsRef = collection(
      db,
      "users",
      user.uid,
      "contacts"
    );

    const unsubscribe = onSnapshot(
      contactsRef,
      (snapshot) => {
        const contactList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setContacts(contactList);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to load contacts");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addContact = async () => {
    if (name.trim() === "" || phone.trim() === "") {
      alert("Please enter name and phone number");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(
        collection(db, "users", user.uid, "contacts"),
        {
          name: name.trim(),
          phone: phone.trim(),
          createdAt: serverTimestamp(),
        }
      );

      setName("");
      setPhone("");

      alert("Emergency contact added");
    } catch (error) {
      console.error(error);
      alert("Failed to add contact");
    }
  };

  const deleteContact = async (id) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await deleteDoc(
        doc(
          db,
          "users",
          user.uid,
          "contacts",
          id
        )
      );

      alert("Contact deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete contact");
    }
  };

  const callContact = (phoneNumber) => {
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <>
      <Navbar />

      <div className="contacts-page">

        <h1>👥 Emergency Contacts</h1>

        <p>
          Add trusted people who can help you during emergencies.
        </p>

        <div className="contact-form">

          <input
            type="text"
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={addContact}>
            Add Contact
          </button>

        </div>

        <div className="contact-list">

          {loading ? (
            <p>Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p>No emergency contacts added yet.</p>
          ) : (
            contacts.map((contact) => (
              <div
                className="contact-card"
                key={contact.id}
              >

                <h3>{contact.name}</h3>

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
          )}

        </div>

      </div>
    </>
  );
}

export default Contacts;