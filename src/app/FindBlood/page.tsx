"use client"
import React, { useState } from "react";

import pic from "../../../asset/compatibility.png"
import Image from "next/image";

const bloodCompatibilityDetails = [
    
    {
      name: 'Blood Compatibility',
      description: 'The general rules for blood transfusion compatibility are as follows: Individuals with type A blood can receive type A or O blood. Individuals with type B blood can receive type B or O blood. Individuals with type AB blood can receive A, B, AB, or O blood.Individuals with type O blood can receive only O blood.'
    }
  ];

const FindBlood = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [firstname, setFirstName] = useState("");

    const handleQuery = async () => {
        try {
            setLoading(true);
    
            const response = await fetch("/api/DonorForm");
            const data = await response.json();
    
            const filteredResults = data.Donors.filter((donor:any) => donor.bloodGroup === bloodGroup);
    
            setTimeout(() => {
                setResults(filteredResults);
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleBloodGroupChange = (e:any) => {
        setBloodGroup(e.target.value);
    };

    const sendSMS = async (phone :any, firstname :any) => {
        try{ 
        const response = await fetch("/api/Sms",{
            
                method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone:phone, 
                firstname:firstname,
            })

            
            
            
        })
        console.log("sent");
        }catch (error) {
            console.error("Error sending data:", error);
        }
        
    };

    return (
        <>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blood Compatibility Details</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Blood compatibility, also known as blood typing or blood grouping, refers to the classification of blood based on the presence or absence of certain antigens on the surface of red blood cells. The two most important blood group systems are the ABO system and the Rh system.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {bloodCompatibilityDetails.map((detail, index) => (
                                        <div key={index} className="relative pl-9">
                                            <dd className="inline">{detail.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="relative w-full h-full">
                            <Image
                                src={pic}
                                alt="Blood Compatibility"
                                layout="responsive"
                                width={800}
                                height={600}
                                className="object-cover w-full h-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center px-4">
                <div className="md:w-1/2 pr-4 lg:pr-8 xl:pr-16">
                    <h1 className="mt-8 text-4xl font-semibold text-center">Find Donors</h1>
                    <form className="mx-auto max-w-sm">
                        <div className="mt-12 mb-4">
                            <label htmlFor="bloodGroup" className="font-semibold text-gray-700">
                                Blood Group
                            </label>
                            <select
                                name="bloodGroup"
                                id="bloodGroup"
                                className="hover:border-red-800 w-full mb-4 mt-2 bg-white border-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                                value={bloodGroup}
                                onChange={handleBloodGroupChange}
                            >
                                <option value="">-- Select --</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={handleQuery}
                            className="w-full sm:w-2/3 mt-4 mx-auto mb-8 sm:block p-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-200 ease-in"
                        >
                            Proceed &gt;
                        </button>
                    </form>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0">
                    {loading ? (
                        <div className="text-center mt-8">
                            <h2 className="text-2xl font-semibold">Loading...</h2>
                        </div>
                    ) : (
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar justify-center px-4">
                            {results.map((result: any, index: number) => (
                                <div key={index} className="inline-block px-3">
                                    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                                        <div className="p-6">
                                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                {`${result.firstName} ${result.lastName}`}
                                            </h5>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                                {result.address}
                                            </p>
                                        </div>
                                        <div className="p-6 pt-0">
                                            <div className="border-t pt-2">
                                                <div className="text-red-400">
                                                    Blood Group: {result.bloodGroup}
                                                </div>
                                                <div className="border-t pt-2 text-gray-500">
                                                    Age: {result.age}
                                                </div>
                                                <div className="border-t pt-2 text-gray-500">
                                                    Phone: {result.phone}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => sendSMS(result.phone, result.firstName)}
                                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mt-4"
                                                type="button"
                                            >
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FindBlood;
