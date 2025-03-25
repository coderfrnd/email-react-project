import React, { createContext, useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import BackGround from "./Component/Background";

const App = () => {
  const [mailPreview, setMailPreview] = useState([]);
  const [originalMailPreview, setOriginalMailPreview] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [bodyMail, setBodyMail] = useState([]);

  useEffect(() => {
    async function getMailIdAndMessage() {
      try {
        let response = await fetch(`https://flipkart-email-mock.vercel.app/`);
        let data = await response.json();
        let addFavAndRead = data.list.map((ele) => ({
          ...ele,
          isFav: false,
          read: false,
        }));
        setMailPreview([...addFavAndRead]);
        setOriginalMailPreview([...addFavAndRead]);
      } catch (error) {
        console.log("Erron in Mail Getting Short Description Mail", error);
      }
    }
    getMailIdAndMessage();
  }, []);

  async function getMailFullMessageWithId(id) {
    try {
      let response = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${id}`
      );
      let data = await response.json();
      let changePreviewData = originalMailPreview.map((ele) =>
        ele.id === id ? { ...ele, read: true } : ele
      );
      setOriginalMailPreview([...changePreviewData]);
      setMailPreview([...changePreviewData]);
      setBodyMail({
        ...data,
        name: originalMailPreview[id].from.name,
        date: originalMailPreview[id].date,
        subject: originalMailPreview[id].subject,
        isFavorite: originalMailPreview[id].isFav,
      });
    } catch (error) {
      console.log("Errors in Full Mail Message Id", error);
    }
  }

  function openSideBar(id) {
    if (!sideBar) {
      setSideBar(true);
    }
    if (id) getMailFullMessageWithId(id);
  }
  function handleButtonClick(btnStatus) {
    let arr = [];
    if (btnStatus === "Read") {
      arr = originalMailPreview.filter((ele) => ele.read === true);
    } else if (btnStatus === "Favorites") {
      arr = originalMailPreview.filter((ele) => ele.isFav === true);
    } else if (btnStatus === "Unread") {
      console.log(originalMailPreview);
      arr = originalMailPreview.filter((ele) => ele.read === false);
    } else {
      arr = [...originalMailPreview];
    }
    setMailPreview([...arr]);
  }
  function addIsFav(id) {
    let changePreviewData = originalMailPreview.map((ele) => {
      if (ele.id === id && ele.isFav == false) {
        return { ...ele, isFav: true };
      } else if (ele.id === id && ele.isFav == true) {
        return { ...ele, isFav: false };
      }
      return ele;
    });
    setOriginalMailPreview(changePreviewData);
    setMailPreview([...changePreviewData]);
    setBodyMail({
      ...bodyMail,
      name: originalMailPreview[id].from.name,
      date: originalMailPreview[id].date,
      subject: originalMailPreview[id].subject,
      isFavorite: originalMailPreview[id].isFav,
    });
  }
  return (
    <>
      <div className="w-full h-full bg-[#F4F5F9] ">
        <Navbar handleButtonClick={handleButtonClick} />
        {mailPreview.length > 0 ? (
          <BackGround
            mailPreview={mailPreview}
            bodyMail={bodyMail}
            sideBar={sideBar}
            openSideBar={openSideBar}
            addIsFav={addIsFav}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default App;
