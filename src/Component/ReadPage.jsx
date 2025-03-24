import React, { useEffect, useState } from "react";
import MailCard from "./MailCard";

const ReadPage = () => {
  const [mailPreview, setMailPreview] = useState([]);
  useEffect(() => {
    async function getMailIdAndMessage() {
      let response = await fetch(`https://flipkart-email-mock.vercel.app/`);
      let data = await response.json();
      setMailPreview([...data.list]);
    }
    getMailIdAndMessage();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-1 cursor-pointer ">
        {mailPreview.length > 0
          ? mailPreview.map((ele, ind) => {
              return <MailCard {...ele} key={ind} />;
            })
          : "Loading"}
      </div>
    </>
  );
};

export default ReadPage;
