import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
//import _ from "lodash";

import Navbar from "./Navbar.jsx";
import Contacts from "./Contacts.jsx";
import SpecificContact from "./SpecificContact.jsx";
import Home from "./Home.jsx";
import AddContact from "./AddContact.jsx";
import Game from "./GameTenzies";

import { ContactContext } from "./contactContext.js";

// //Shallow copy
// //let shallowCopy = [...lisOfFriends];
// // هرگاه در داخل یک آرایه ما آبجکت های تودر تو داشته باشیم
// // برای اینکه یک کپی بیگیریم و با آوردن تغییرات در کپی آن اصل آن تغییر نکند باید از متود زیر استفاده کنیم.
// //ُJSON.stringify then JSON.parse

// let lisOfFriends = [
//   "mahdi",
//   {
//     closeFriends: ["nawid", "ali"],
//   },
// ];
// // shallow copy
// let shallowCopy = [...lisOfFriends];
// let DeepCopy = JSON.parse(JSON.stringify(lisOfFriends));

// // this will change the original array because of the object in the array.
// //shallowCopy[1].closeFriends[0] = "Ehsan";
// console.log("Original: ", lisOfFriends);

// // deep copy
// DeepCopy[1].closeFriends = ["Hannan"];
// //console.log("shallow Copy: ", shallowCopy);
// console.log("Deep Copy: ", DeepCopy);

const Main = () => {
  const [loading, setLoading] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [filterContacts, setFilterContacts] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [failedToFetch, setFailedToFetch] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const navigate = useNavigate();

  //* How to delete a contact from an array of objects with filter mehtod

  // const deleteCont = (number) => {
  //   setContacts((prevData) => {
  //     return prevData.filter((contact) => contact.id !== number);
  //   });
  //   navigate("/Contact" + location.search);
  // };

  //* How to add Contact with use of fetch (POST)

  async function addContact(contact) {
    setLoading((prevData) => true);
    try {
      const response = await fetch("http://localhost:9000/contacts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.status === 201) {
        const data = await response.json();
        const allContacts = [...contacts, data];
        toast.success("Contact added");
        setContacts(allContacts);
        setFilterContacts(allContacts);
        setLoading((prevData) => false);
        navigate("/Contact");
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevData) => false);
      navigate("/Contact");
      alert(`${err.message},Please Check Your Internet Connection`);
    }
  }

  //* How to update a contact with use of fetch

  const updateContact = async (contact, contactId) => {
    setLoading((prevData) => true);
    try {
      const response = await fetch(
        `http://localhost:9000/contacts/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );

      if (response.status === 200) {
        const updatedContact = await response.json();

        const nonUpdatedContacts = contacts.filter(
          (contact) => parseInt(contact.id) !== parseInt(contactId)
        );

        const allContacts = [...nonUpdatedContacts, updatedContact];

        setContacts(allContacts);
        setFilterContacts(allContacts);
        toast.success("Contact updated successfully");
        setLoading((prevData) => false);
        navigate("/Contact");
      }
    } catch (err) {
      navigate("/Contact");
      console.log(err.message);
      setLoading((prevData) => false);
    }
  };

  //* How to make a pop-up modal for deleting a contact
  const confirmDelete = (contactName, contactId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-light p-5 rounded-3">
            <h2>Deleting Contact</h2>
            <p>
              Are you sure to delete <strong> {contactName} </strong> ?
            </p>
            <button
              className="btn btn-danger rounded-2"
              onClick={() => {
                deleteContact(contactId);
                onClose();
              }}
            >
              Yes, Delete it
            </button>
            <button
              className="btn btn-secondary rounded-2 mx-2 w-25"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        );
      },
      // title: "Deleting Contact",
      // message: `Are you sure to delete ${contactName}`,
      // buttons: [
      //   { label: "Yes,Delete it", onClick: () => deleteContact(contactId) },
      //   {
      //     label: "Cancel",
      //     onClick: () => {},
      //   },
      // ],
    });
  };

  //* How to delete a contact whith use of fetch (DELETE)

  const deleteContact = async (id) => {
    //copy of the all contacts
    setLoading((prevData) => true);

    const copyOfContacts = contacts;

    const newContacts = contacts.filter(
      (contact) => parseInt(contact.id) !== parseInt(id)
    );
    setContacts([...newContacts]);
    setFilterContacts([...newContacts]);
    setLoading((prevData) => false);
    toast.error("Contact Deleted Successfully");
    try {
      const response = await fetch("http://localhost:9000/contacts/" + id, {
        method: "DELETE",
      });
      if (response.status !== 200) {
        setContacts([...copyOfContacts]);
        setFilterContacts([...copyOfContacts]);
      }
    } catch (err) {
      console.log(err.message);
      setContacts([...copyOfContacts]);
      setContacts([...copyOfContacts]);
      setLoading((prevData) => false);
    }
  };

  const filteredContacts = (string) => {
    setTimeout(() => {
      setFilterContacts(
        contacts.filter((contact) => {
          if (!string) return contact;
          return contact.fullName.toLowerCase().includes(string.toLowerCase());
        })
      );
    }, 500);
  };

  //* This useEffect is exceuted when the Main.jsx is mounted in the DOM
  //* and when a the value of the forceRender is changed.

  React.useEffect(() => {
    console.log("use Effect main.js");
    setLoading((prevData) => true);
    const fetchData = async () => {
      try {
        const resp1 = await fetch("http://localhost:9000/groups");
        const resp = await fetch("http://localhost:9000/contacts");

        const groupData = await resp1.json();
        const data = await resp.json();
        toast.info("Loading...");
        setContacts(data);
        setFilterContacts(data);
        setGroups(groupData);

        setLoading((prevData) => false);
      } catch (err) {
        console.log(err.message);
        setLoading((prevData) => false);
        setFailedToFetch((prevData) => true);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  // React.useEffect(() => {
  //   console.log("force render update");
  //   const fetchData = async () => {
  //     setLoading((prevData) => true);
  //     setContacts([]);
  //     console.log("fetch for update");
  //     const response = await fetch("http://localhost:9000/contacts");
  //     const data = await response.json();
  //     console.log(data + "updated data");

  //     setContacts(data);
  //     console.log(contacts);

  //     setLoading((prevData) => false);
  //   };
  //   fetchData();
  // }, []);
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contacts,
        filterContacts,
        setContacts,
        groups,
        confirmDelete,
        addContact,
        updateContact,
        failedToFetch,
        filteredContacts,
        errors,
      }}
    >
      <div className="container">
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />

            <Route path="/Contact" element={<Contacts />} />

            <Route path="/Contact/:contactId" element={<SpecificContact />} />

            <Route path="/addContact/:contactId" element={<AddContact />} />

            <Route path="/game" element={<Game />} />

            <Route path="*" element={<div>Not Found 404</div>} />
          </Route>
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default Main;
