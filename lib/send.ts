export const sendEmail = async (emailContent) => {


  try {
    await console.log(emailContent);
    return true;
  } catch (err) {
    console.error("Failed to send email: ", err);
    return false;
  }
};