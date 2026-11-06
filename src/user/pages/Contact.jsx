import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UserHeader from "../components/UserHeader";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const { user_name, user_email, message } = form.current;

    // Validate form fields
    if (
      user_name.value.trim() &&
      user_email.value.trim() &&
      message.value.trim()
    ) {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
          },
        )
        .then(
          () => {
            console.log("SUCCESS!");
            toast.success(
              "Thank you for contacting us! Our team will get back to you.",
            );

            // Clear form after successful submission
            form.current.reset();
          },
          (error) => {
            console.log("FAILED...", error);
            toast.error("Failed to send message. Please try again.");
          },
        );
    } else {
      toast.warning("Please fill all fields completely!");
    }
  };

  return (
    <>
      <UserHeader />

      <div>
        {/* Contact Heading */}
        <div className="flex flex-col items-center justify-center mt-5 px-5">
          <h1 className="text-2xl font-bold">Contacts</h1>

          <p className="text-center mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            voluptates tempora accusamus. Obcaecati itaque id animi, quidem
            provident vitae omnis velit quia voluptatem maiores ratione quae
            nemo tempore ut excepturi! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fugiat repellat commodi repudiandae, tempore
            provident similique id sit in obcaecati aut. Consectetur in
            aspernatur non recusandae voluptatum aut enim fuga incidunt!
          </p>
        </div>

        {/* Contact Details */}
        <div className="md:grid grid-cols-3 p-5 gap-5">
          <div className="flex mx-5 items-center">
            <img
              className="mx-3"
              src="https://i.pinimg.com/1200x/c7/c3/5d/c7c35d0a6e5e504f4e4a4761fe2b6f45.jpg"
              alt="Address"
              height="30px"
              width="30px"
              style={{ borderRadius: "50%" }}
            />
            <p className="text-justify">
              123 Main street, apt 4B Anytown 91234
            </p>
          </div>

          <div className="flex mx-5 items-center">
            <img
              className="mx-3"
              src="https://i.pinimg.com/736x/7a/bc/cc/7abccc8b895f22d919418860325385d6.jpg"
              alt="Phone"
              height="30px"
              width="30px"
              style={{ borderRadius: "50%" }}
            />
            <h3>+91 9876543210</h3>
          </div>

          <div className="flex mx-5 items-center">
            <img
              className="mx-3"
              src="https://i.pinimg.com/736x/e1/03/fb/e103fba09de3c08d8cec649e4a584130.jpg"
              alt="Email"
              height="30px"
              width="30px"
              style={{ borderRadius: "50%" }}
            />
            <h3>Bookstore@gmail.com</h3>
          </div>
        </div>

        {/* Contact Form and Google Map */}
        <div className="md:grid grid-cols-2 p-5 gap-5">
          {/* Contact Form */}
          <div className="bg-gray-300 w-full md:w-3/4 p-5 mx-auto my-5 rounded-lg">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col items-center justify-center"
            >
              <h1 className="font-bold text-xl">Send Me Message</h1>

              <input
                className="mt-5 bg-white w-full rounded p-2"
                type="text"
                name="user_name"
                placeholder="Name"
                required
              />

              <input
                className="mt-5 bg-white w-full p-2 rounded"
                type="email"
                name="user_email"
                placeholder="Email ID"
                required
              />

              <textarea
                className="mt-5 bg-white w-full p-2 rounded"
                name="message"
                placeholder="Message"
                rows={6}
                required
              />

              <button
                type="submit"
                className="mt-5 bg-blue-900 w-full rounded text-white p-2 hover:bg-blue-700"
              >
                Send <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>

          {/* Google Map */}
          <div className="flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d125218.47077534569!2d75.87744778461915!3d11.255730408320867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1790792532423!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0, maxWidth: "100%" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="p-5"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </>
  );
}

export default Contact;
