import React, { useState } from "react";
import MailCard from "./MailCard";
const CombineCardAndDetails = ({
  mailPreview,
  openSideBar,
  sideBar,
  activeId,
}) => {
  return (
    <>
      <div
        className={` ${
          sideBar ? "h-screen overflow-scroll" : "justify-center  p-1"
        } flex flex-col p-1 cursor-pointer `}
      >
        {mailPreview.map((ele, ind) => (
          <MailCard
            {...ele}
            key={ind}
            openSideBar={openSideBar}
            activeId={activeId === ele.id}
          />
        ))}
      </div>
    </>
  );
};

export default CombineCardAndDetails;
