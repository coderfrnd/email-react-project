import React from "react";
import MailDetails from "./MailDetails";
import CombineCardAndDetails from "./sideBarComponent.jsx/CombineCardAndDetails";

const UnRead = ({ sideBar, mailPreview, openSideBar, bodyMail, addIsFav }) => {
  let { id } = bodyMail;
  return (
    <>
      <>
        {
          <div
            className={`${
              sideBar ? "grid grid-cols-[40%_60%]" : "h-screen w-full"
            }`}
          >
            {mailPreview.length > 0 ? (
              <>
                <CombineCardAndDetails
                  mailPreview={mailPreview}
                  sideBar={sideBar}
                  openSideBar={openSideBar}
                  activeId={id}
                />
                {sideBar ? <MailDetails {...bodyMail} isFav={addIsFav} /> : ""}
              </>
            ) : (
              "Loading"
            )}
          </div>
        }
      </>
    </>
  );
};

export default UnRead;
