export default async function getMailIdAndMessage(setOriginalMailPreview) {
  try {
    let response = await fetch(`https://flipkart-email-mock.vercel.app/`);
    let data = await response.json();
    let addFavAndRead = data.list.map((ele) => ({
      ...ele,
      isFav: false,
      read: false,
      tempRead: false,
    }));
    setOriginalMailPreview([...addFavAndRead]);
  } catch (error) {
    console.log("Erron in Mail Getting Short Description Mail", error);
  }
}
