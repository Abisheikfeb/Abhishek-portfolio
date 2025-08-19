import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { GoMail } from "react-icons/go";

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const emailInput = form.current?.from_email?.value;

    if (!emailInput || emailInput.length < 5) {
      setEmailError("Email must be at least 5 characters long.");
      return;
    } else {
      setEmailError("");
    }

    emailjs
      .sendForm(
        "service_Abisheik27",
        "template_3uaq25c",
        form.current,
        "IQcGAimg815OjOWrG"
      )
      .then(
        () => {
          setStatusMessage("Successfully sent!");
          setIsError(false);
          form.current.reset();
          setName(""); // Reset name field
        },
        (error) => {
          setStatusMessage("Failed.");
          setIsError(true);
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div id="contactme" className="mt-12">
      <h1 className="text-center font-medium mt-10 text-3xl">
        <span className="text-5xl text-red-500">C</span>ontact Me
      </h1>

      <div className="flex justify-center gap-6 md:border-none md:p-6 m-11 p-8 flex-col items-center border-2 rounded-2xl border-red-500">
        <h2 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
          GET IN TOUCH
        </h2>

        <p className="mt-4 text-center text-xl md:text-2xl text-red-800">
          Contact me here, I am available for you.
        </p>

        <div className="flex justify-center gap-6 mt-6 mb-1">
          <a
            href="https://www.linkedin.com/in/abisheik-s-7227b2304/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-4xl text-blue-500" />
          </a>

          <a
            href="mailto:abisheik2004feb@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoMail className="text-4xl text-red-500" />
          </a>

          <a
            href="https://www.instagram.com/abisheik_feb27/profilecard/?igsh=MWRkNzR3bDZudDVscg=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-4xl text-pink-500" />
          </a>

          <a
            href="https://github.com/Abisheikfeb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="text-4xl" />
          </a>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col bg-slate-100 md:bg-gray-500 border-2 border-gray-300 rounded-2xl p-8 gap-6 shadow-lg max-w-md w-full md:w-96 py-10 md:justify-start"
        >
          <section className="flex flex-col">
            <label htmlFor="name" className="text-lg font-bold text-gray-700">
              Name
            </label>
            <input
              className="border-2 border-gray-300 bg-gray-200 p-3 rounded-md text-black text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="from_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
          </section>

          <section className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              className={`bg-gray-200 p-3 border-2 ${
                emailError ? "border-red-600" : "border-gray-300"
              } rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400`}
              type="email"
              name="from_email"
              required
            />
            {emailError && <p className="text-sm text-red-600">{emailError}</p>}
          </section>

          <section className="flex flex-col">
            <label htmlFor="message" className="text-lg font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="bg-gray-200 p-3 border-2 border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="message"
              required
            />
          </section>

          <section className="flex items-center gap-4">
            <input
              className="bg-blue-500 text-white border-2 border-blue-500 px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-all"
              type="submit"
              value="Send"
            />
            {statusMessage && (
              <p
                className={`text-base ml-4 ${
                  isError ? "text-red-500" : "text-green-500"
                }`}
              >
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
