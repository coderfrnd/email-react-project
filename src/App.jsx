import React, { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./Component/Navbar";
import BackGround from "./Component/Background";
import NoMail from "./Component/NoMail";

const App = () => {
  const [originalMailPreview, setOriginalMailPreview] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [bodyMail, setBodyMail] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

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
      let selectedMail = changePreviewData.find((ele) => ele.id === id);
      setBodyMail({
        ...data,
        name: selectedMail.from.name,
        date: selectedMail.date,
        subject: selectedMail.subject,
        isFavorite: selectedMail.isFav,
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
  function filterActiveStatus(btnStatus) {
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
    return arr;
  }
  function handleButtonClick(btnStatus) {
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
