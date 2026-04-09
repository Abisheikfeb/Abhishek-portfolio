import React, { useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaPaperPlane } from "react-icons/fa";
import { GoMail, GoPaperclip } from "react-icons/go";

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const TELEGRAM_BOT_TOKEN = "8251299205:AAHpnVgsYo0b0ChyEFfySq5PYBHgaG8bSCU";
  const CHAT_ID = "8226066763";

  const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "HTML" }),
    });
    if (!response.ok) throw new Error("Message failed");
  };

  const sendTelegramDocument = async (file) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("document", file);
    const response = await fetch(url, { method: "POST", body: formData });
    if (!response.ok) throw new Error("Document failed");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailInput = form.current?.from_email?.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(emailInput)) {
      setStatusMessage("⚠️ Please enter a valid email address.");
      setIsError(true);
      setLoading(false);
      return;
    }

    const message = `<b>🚀 New Contact Inquiry</b>\n\n<b>👤 Name:</b> ${name}\n<b>✉️ Email:</b> ${emailInput}\n<b>📝 Message:</b> ${form.current.message.value}`;

    try {
      await sendTelegramMessage(message);
      if (selectedFile) await sendTelegramDocument(selectedFile);

      setStatusMessage("✨ Message sent successfully! I'll get back to you soon.");
      setIsError(false);
      form.current.reset();
      setName("");
      setSelectedFile(null);
    } catch {
      setStatusMessage("❌ System busy. Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contactme" className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
  
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Get In Touch</h2>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
          Let's work <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">together.</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
      
        <div className="space-y-8 order-2 lg:order-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Connect with me</h3>
            <div className="grid grid-cols-2 gap-4">
              <SocialCard icon={<FaLinkedin className="text-blue-600"/>} label="LinkedIn" link="https://linkedin.com/in/abisheik-s-7227b2304/" />
              <SocialCard icon={<FaGithub className="text-slate-900"/>} label="GitHub" link="https://github.com/Abisheikfeb" />
              <SocialCard icon={<FaInstagram className="text-pink-600"/>} label="Instagram" link="https://instagram.com/abisheik_feb27" />
              <SocialCard icon={<GoMail className="text-red-500"/>} label="Email" link="mailto:abisheik2004feb@gmail.com" />
            </div>
          </div>
          
          <div className="hidden lg:block p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl">
            <h4 className="text-xl font-bold mb-2">Why reach out?</h4>
            <p className="opacity-90 text-sm leading-relaxed">
              Whether it's a new opportunity, a collaboration, or just a technical question, 
              I usually respond within 24 hours!
            </p>
          </div>
        </div>

        
        <div className="order-1 lg:order-2">
          <form
            ref={form}
            onSubmit={sendMessage}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-100"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Abisheik S"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Email Address</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="hello@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none transition-all ${
                    isError ? "border-red-500 focus:ring-red-500/10" : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"
                  }`}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                />
                
                
                <div className="mt-2 flex items-center justify-between">
                   <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${selectedFile ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-100 border-slate-200 text-slate-500 group-hover:bg-slate-200'}`}>
                      <GoPaperclip className={selectedFile ? "animate-bounce" : ""} />
                      <span className="text-xs font-bold">{selectedFile ? selectedFile.name : "Attach File"}</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
                <FaPaperPlane className="text-sm" />
              </button>

              {statusMessage && (
                <div className={`mt-4 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${isError ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"}`}>
                  {statusMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const SocialCard = ({ icon, label, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all group"
  >
    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[10px] uppercase font-black text-slate-400 group-hover:text-slate-600 tracking-tighter">{label}</span>
  </a>
);

export default ContactUs;