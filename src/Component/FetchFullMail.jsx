export default async function getMailFullMessageWithId(
  id,
  setOriginalMailPreview,
  setBodyMail,
  originalMailPreview
) {
  try {
    let response = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${id}`
    );
    let data = await response.json();
    console.log(data);

    let changePreviewData = originalMailPreview.map((ele) => {
      return ele.id === id
        ? { ...ele, read: true, tempRead: ele.tempRead ? false : true }
        : { ...ele, tempRead: false };
    });
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
