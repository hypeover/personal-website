"use server";

import { Resend } from "resend";

const resend = new Resend("re_SprwRTdz_21NUDQStScnp7wSpnDd7SGaP");

interface EmailContent {
  author: string,
  subject: string,
  content: string,
}

export const sendEmail = async (emailContent: EmailContent) => {

  if (!emailContent.author || !emailContent.content) {
    return { error: "There are some empty fields..." }
  }
  try {
    const { error } = await resend.emails.send({
      from: "Contact form <onboarding@resend.dev>",
      to: "krystian14113@gmail.com",
      subject: emailContent.subject,
      replyTo: emailContent.author,
      text: emailContent.content
    })

    if (error) {
      console.error("Błąd Resend:", error.message);
      return { error: `Błąd wysyłki: ${error.message}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Błąd serwera:", error);
    return { error: "Wystąpił błąd techniczny. Spróbuj ponownie później." };
  }
}