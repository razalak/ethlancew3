
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import UserDetailsContract from "./contracts/UserDetails.json";
import "./App.css";
import {db} from "./firebase";
import{collection,getDocs,addDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    category: "",
    skills: ""
  });

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if Web3 is injected by the browser (MetaMask)
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access
        } else if (window.web3) {
          // Legacy dapp browsers
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          // Fallback to localhost if no web3 injection
          console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
          window.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
        alert('hey');
      }
    };
    initWeb3();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await window.web3.eth.getAccounts();
      const networkId = await window.web3.eth.net.getId();
      const deployedNetwork = UserDetailsContract.networks[networkId];
      const contract = new window.web3.eth.Contract(
        UserDetailsContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.addUserDetails(
        formData.username,
        formData.name,
        formData.phoneNumber,
        formData.category,
        formData.skills
      ).send({ from: accounts[0] });

      alert("User details added successfully!");
      // Clear form fields after successful submission
      setFormData({
        username: "",
        name: "",
        phoneNumber: "",
        category: "",
        skills: ""
      });
    } catch (error) {
      console.error("Error adding user details:", error);
      alert("Failed to add user details. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Add User Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        
        <label>Skills:</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
