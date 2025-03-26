import React, { useEffect, useState } from "react";

const MailDetails = ({ body, id, isFav, date, subject, isFavorite, email }) => {
  const htmlString = body;
  let bodyMessage;
  const timestamp = date;
  const formattedDate = new Date(timestamp).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  function removeHtmlTags() {
    return htmlString.replace(/<\/p>/g, "</p><br/>");
  }
  if (htmlString) {
    bodyMessage = removeHtmlTags();
  }
  const [favoriteButtonSwitch, setfavoriteButtonSwitch] = useState(false);
  // console.log(isFavorite, "from mail details");

  useEffect(() => {
    setfavoriteButtonSwitch(isFavorite);
  }, [id, isFavorite]);
  return (
    <div className="bg-white border w-[88%]  m-8 mt-5 border-[#CFD2DC] rounded-[8px]  shadow-md">
      <section className="upper-Section flex p-8 pb-0 justify-between pr-[60px]">
        <div className="flex  space-x-6">
          <div className="bg-[#E54065] h-14 w-14 rounded-full text-center text-white flex justify-center items-center font-bold text-2xl ">
            <span> {email ? email[0].toUpperCase() : "Y"}</span>
          </div>
          <h1 className="text-3xl font-bold text-center  text-[#636363]">
            {subject ? subject : ""}
          </h1>
        </div>

        <button
          className="bg-[#E54065] h-10 text-white font-bold cursor-pointer w-46 rounded-full"
          onClick={(e) => {
            isFav(id);
            setfavoriteButtonSwitch(!favoriteButtonSwitch);
          }}
        >
          {favoriteButtonSwitch ? "Remove from Fav" : "Marks as favorite"}
        </button>
      </section>
      <span className="mb-6 pl-[120px] block text-[#636363] font-[500] text-[15px] ">
        {formattedDate}
      </span>
      <div className="message  pl-[120px] pr-[60px]">
        <p
          className="text-[15px] text-[#636363] leading-relaxed text-justify font-medium "
          dangerouslySetInnerHTML={{ __html: bodyMessage }}
        />
      </div>
    </div>
  );
};

export default MailDetails;
