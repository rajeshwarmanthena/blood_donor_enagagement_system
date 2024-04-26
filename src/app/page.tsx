import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Hero />
      <Footer/>
    </div>
  );
};

export default page;
