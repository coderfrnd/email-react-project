import React from "react";

const MailCard = ({ short_description, from, subject, date }) => {
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
  // console.log(formattedDate);
  return (
    <div className="w-[90%] p-6 bg-[#F2F2F2] border rounded-[5px] flex space-x-8 m-4">
      <div className="bg-[#E54065] h-16 w-16 rounded-full"></div>
      <div className="mail-part">
        <header className="p-2">
          <span>From:</span>
          <strong>{email}</strong>
        </header>
        <div className="p-2">
          <span>Subject:</span>
          <strong>{subject}</strong>
        </div>
        <p>{short_description}</p>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default MailCard;
