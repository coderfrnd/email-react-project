import React from "react";
import Navbar from "./Component/Navbar";
import MailCard from "./Component/MailCard";
import ReadPage from "./Component/ReadPage";

const App = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#F4F5F9] ">
        <Navbar />
        {/* <MailCard /> */}
        <ReadPage />
      </div>
    </>
  );
};

export default App;
