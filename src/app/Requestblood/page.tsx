"use client"
import { useRouter } from "next/navigation";
import blood from "../../../asset/reqblood.png"
import Image from "next/image";
import React, { useState } from 'react';

const Requestblood = () => {
  const router = useRouter();

  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [hospital, setHospital] = useState('');

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const dataToSend = {
        patientName,
        mobileNumber,
        bloodType,
        hospital
      };

      const response = await fetch("/api/Requestblood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Patient data submitted successfully:", data);
      router.push("/"); // Redirect to home page after successful submission

      // Reset form fields
      setPatientName('');
      setMobileNumber('');
      setBloodType('');
      setHospital('');
    } catch (error) {
      console.error("Error submitting patient data:", error);
    }
  };
  
  return (
      

    <>
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-white dark:bg-gray-900">
      
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">BLOOD REQUEST</h1>

          <p className="mt-4 text-gray-500">
            Are you in need of blood? Post your request here and let potential donors find you. Every drop counts! 💉 #BloodDonation #SaveLives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 shadow border-1 p-8">
          <div className="mb-5">
            <label htmlFor="patientName" className="sr-only">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Patient's Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="mobilenumber" className="sr-only">Mobile number</label>
            <input
              type="tel"
              id="mobilenumber"
              name="mobilenumber"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="XXXX-XXX-XXX"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="bloodType" className="sr-only">Blood Type</label>
            <select
              id="bloodType"
              name="bloodType"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="hospital" className="sr-only">Hospital Address</label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Hospital Address"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="inline-block rounded-lg bg-blue-600 hover:bg-red-800 px-5 py-3 text-sm font-medium text-white">
              Submit Request
            </button>
          </div>
        </form>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 bg-white dark:bg-gray-900">
      <Image src={blood} alt="logo" className="absolute inset-0 h-full w-full object-cover" />
    
    
  </div>
      </section>
    </>
  );
};

export default Requestblood;
