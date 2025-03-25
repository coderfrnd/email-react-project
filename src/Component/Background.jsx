import React from "react";
import MailDetails from "./MailDetails";
import CombineCardAndDetails from "./CombineCardAndDetails";

const BackGround = ({
  sideBar,
  mailPreview,
  openSideBar,
  bodyMail,
  addIsFav,
}) => {
  let { id } = bodyMail;
  return (
    <>
      {
        <div
          className={`${
            sideBar
              ? "grid grid-cols-[40%_60%] pl-11 "
              : "h-screen w-full pl-11"
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
  );
};

export default BackGround;
