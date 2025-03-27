import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./Component/Navbar";
import BackGround from "./Component/Background";
import NoMail from "./Component/NoMail";
import getMailIdAndMessage from "./Component/FetchShrortDescMail";
import getMailFullMessageWithId from "./Component/FetchFullMail";

const App = () => {
  const [originalMailPreview, setOriginalMailPreview] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [bodyMail, setBodyMail] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  useEffect(() => {
    getMailIdAndMessage(setOriginalMailPreview);
  }, []);

  async function openSideBar(id) {
    if (!sideBar) {
      setSideBar(true);
    }
    if (id)
      await getMailFullMessageWithId(
        id,
        setOriginalMailPreview,
        setBodyMail,
        originalMailPreview
      );
  }
  function filterActiveStatus(btnStatus) {
    let arr = [];
    if (btnStatus === "Read") {
      arr = originalMailPreview.filter((ele) => ele.read === true);
    } else if (btnStatus === "Favorites") {
      arr = originalMailPreview.filter((ele) => ele.isFav === true);
    } else if (btnStatus === "Unread") {
      console.log("Filtering Unread Emails...");
      arr = originalMailPreview.filter((ele) => {
        if (ele.read == ele.tempRead) {
          return ele;
        }
      });
    } else {
      arr = [...originalMailPreview];
    }
    return arr;
  }
  function handleButtonClick(btnStatus) {
    setOriginalMailPreview((prevMails) => {
      return prevMails.map((ele) => ({ ...ele, tempRead: false }));
    });
    setActiveFilter(btnStatus);
    setSideBar(false);
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
    // console.log(originalMailPreview == filterActiveStatus(activeFilter));
    // setMailPreview(filterActiveStatus(activeFilter));
    let updatedMail = changePreviewData.find((ele) => ele.id === id);
    if (updatedMail) {
      setBodyMail((prevBodyMail) => ({
        ...prevBodyMail,
        name: updatedMail.from.name,
        date: updatedMail.date,
        subject: updatedMail.subject,
        isFavorite: updatedMail.isFav,
      }));
      // console.log(bodyMail);
    }
  }
  return (
    <>
      <div className="w-full h-full bg-[#F4F5F9] ">
        <Navbar handleButtonClick={handleButtonClick} />
        {filterActiveStatus(activeFilter).length > 0 ? (
          <BackGround
            mailPreview={filterActiveStatus(activeFilter)}
            bodyMail={bodyMail}
            sideBar={sideBar}
            openSideBar={openSideBar}
            addIsFav={addIsFav}
          />
        ) : (
          <NoMail />
        )}
      </div>
    </>
  );
};
export default App;
