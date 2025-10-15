import React, { useRef, useState } from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { GoMail, GoPaperclip } from "react-icons/go";

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

const TELEGRAM_BOT_TOKEN ="8251299205:AAHpnVgsYo0b0ChyEFfySq5PYBHgaG8bSCU";
  const CHAT_ID = "8226066763";

  // Send text message to Telegram
  const sendTelegramMessage = async (message) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const params = { chat_id: CHAT_ID, text: message, parse_mode: "HTML" };
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${url}?${query}`, { method: "GET" });
      if (!response.ok) throw new Error("Telegram API Error while sending message");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Send file/document to Telegram
  const sendTelegramDocument = async (file) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
      const formData = new FormData();
      formData.append("chat_id", CHAT_ID);
      formData.append("document", file);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Telegram API Error while sending document");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const emailInput = form.current?.from_email?.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(emailInput)) {
      setStatusMessage("⚠️ Please enter a valid email address.");
      setIsError(true);
      return;
    }

  
const message =
`📨 <b>New Contact Message</b>\n
👤 <b>Name:</b> ${name}\n
✉️ <b>User Email:</b> ${emailInput}\n
📝 <b>Message:</b> ${form.current.message.value}\n
${selectedFile ? `📎 <b>Attachment:</b> ${selectedFile.name}` : ""}`;

    try {
      // Send text message first
      await sendTelegramMessage(message);

      // Send attached file if available
      if (selectedFile) {
        await sendTelegramDocument(selectedFile);
      }

      setStatusMessage("✅ Message sent successfully!");
      setIsError(false);
      form.current.reset();
      setName("");
      setSelectedFile(null);
    } catch {
      setStatusMessage("❌ Failed to send message. Try again later.");
      setIsError(true);
    }
  };

  return (
    <div id="contactme" className="mt-12">
      <h1 className="text-center font-bold mt-10 text-3xl md:text-4xl tracking-wide">
        <span className="text-5xl md:text-6xl text-red-500 drop-shadow-sm">C</span>
        ontact Me
      </h1>

      {/* Social Links */}
      <div className="flex justify-center gap-6 md:border-none md:p-6 m-11 p-8 flex-col items-center border border-red-400 rounded-2xl shadow-lg hover:shadow-xl transition">
        <h2 className="text-2xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 drop-shadow-sm">
          GET IN TOUCH
        </h2>
        <p className="mt-4 text-center text-lg md:text-xl text-red-800 font-medium">
          Contact me here, I am available for you.
        </p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="https://www.linkedin.com/in/abisheik-s-7227b2304/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaLinkedin className="text-4xl text-blue-500 drop-shadow" />
          </a>
          <a href="mailto:abisheik2004feb@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <GoMail className="text-4xl text-red-500 drop-shadow" />
          </a>
          <a href="https://www.instagram.com/abisheik_feb27/profilecard/?igsh=MWRkNzR3bDZudDVscg==" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FaInstagram className="text-4xl text-pink-500 drop-shadow" />
          </a>
          <a href="https://github.com/Abisheikfeb" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <BsGithub className="text-4xl drop-shadow" />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex justify-center mt-16 px-4 sm:px-0">
        <form
          ref={form}
          onSubmit={sendMessage}
          noValidate
          className="flex flex-col bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 gap-6 shadow-xl w-full sm:max-w-md md:w-96 py-10"
        >
          {/* Name */}
          <section className="flex flex-col">
            <label className="text-base font-semibold text-gray-800 mb-1">Name</label>
            <input
              type="text"
              name="from_name"
              value={name}
              required
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="border border-gray-300 bg-gray-100 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </section>

          {/* Email */}
          <section className="flex flex-col">
            <label className="text-base font-semibold text-gray-800 mb-1">Email</label>
            <input
              type="text"
              name="from_email"
              required
              className={`bg-gray-100 p-3 border rounded-lg text-black focus:outline-none shadow-sm ${
                isError ? "border-red-500 focus:ring-red-500" :
                statusMessage && !isError ? "border-green-500 focus:ring-green-500" :
                "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </section>

          {/* Message */}
          <section className="flex flex-col relative">
            <label className="text-base font-semibold text-gray-800 mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              className="bg-gray-100 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none pr-28"
            />

            {/* Hidden file input */}
            <input
              type="file"
              name="attachment"
              id="file"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            {/* Attachment icon with rounded border */}
            <label
              htmlFor="file"
              className={`absolute bottom-3 right-3 flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-1 transition-colors ${
                selectedFile ? "bg-green-50 border-green-400 text-green-500 hover:bg-green-100" : "bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <GoPaperclip className="text-xl" />
              <span className="text-sm">{selectedFile ? "Attached" : "Attach"}</span>
            </label>
          </section>

          <section className="flex flex-col gap-3">
            <input
              type="submit"
              value="Send"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out"
            />
            {statusMessage && (
              <p className={`text-sm font-medium px-4 py-2 rounded-lg shadow-md ${isError ? "bg-red-100 text-red-600 border border-red-300" : "bg-green-100 text-green-600 border border-green-300"}`}>
                {statusMessage}
              </p>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
