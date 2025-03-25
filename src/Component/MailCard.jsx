import React, { useState } from "react";

const MailCard = ({
  short_description,
  from,
  subject,
  date,
  openSideBar,
  id,
  read,
  isFav,
  activeId,
}) => {
  let { email } = from;
  const timestamp = date;
  const formattedDate = new Date(timestamp).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div
      className={`w-[90%] p-3 pl-6 border-[1px] border-[#CFD2DC] rounded-[5px] flex m-4  ${
        read ? "bg-[#F2F2F2]" : "bg-white"
      } ${activeId ? "border-[#E54065]" : ""} `}
      onClick={(e) => {
        openSideBar(id);
      }}
    >
      <div className="bg-[#E54065]  h-14 w-14 rounded-full text-center text-white flex justify-center items-center font-bold text-2xl aspect-square">
        <span>{email[0].toUpperCase()}</span>
      </div>
      <div className="mail-part pl-6 text-[#636363]">
        <header className="p-1 text-[16px] ">
          <span>From: </span>
          <strong>{email}</strong>
        </header>
        <div className="p-1 pt-[1px] text-[16px] ">
          <span>Subject: </span>
          <strong>{subject}</strong>
        </div>
        <p className="line-clamp-1 p-1 pt-2 text-[16px]">
          {short_description}...
        </p>
        <article className="space-x-8">
          <span className="p-1 pt-2 text-[14px]">{formattedDate}</span>
          {isFav ? (
            <span className="text-[#E54065] font-bold text-[14px]">
              Favorite
            </span>
          ) : (
            ""
          )}
        </article>
      </div>
    </div>
  );
};

export default MailCard;
