// Material UI Icons--
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
// Styling file--
import "./contact.scss";
// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//components--
import MetaData from "./../MetaData";
import { backendUrl } from "./../../helper";
import ToastNotification from "../ToastNotification/ToastNotification";
import PreLoader from "../preLoader/PreLoader";
// store and get data from redux store--
import {
  errorMessage,
  successMessage,
} from "../../reducers/toastMessage/toastReducer";
const Contact = () => {
  const { errorMsg, successMsg } = useSelector((state) => state.toastReducer);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // send mail handler--
  const sendMailHanlder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/v1/contact`, {
        method: "POST",
        body: JSON.stringify({ email, subject, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        dispatch(successMessage(data.message));
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setLoading(false);
        dispatch(errorMessage(data.message));
      }
    } catch (err) {
      setLoading(false);
      dispatch(errorMessage(err.message));
    }
  };
  return (
    <>
      <MetaData title={"Contact Page"} />
      {errorMsg && <ToastNotification classname={"error"} text={errorMsg} />}
      {successMsg && (
        <ToastNotification classname={"success"} text={successMsg} />
      )}
      {loading ? (
        <PreLoader />
      ) : (
        <div className="contact-page">
          {/* Banner Div-- */}
          <div className="contact-banner">
            <h2>Contact With Us</h2>
          </div>
          {/* Container Div-- */}
          <div className="contact-container">
            {/* Contact Address Info-- */}
            <div className="contact-address">
              <address>
                <HomeIcon className="icon" />
                <p>
                  California, United States <br />
                  <span>Santa monica bullevard</span>
                </p>
              </address>
              <div className="phone">
                <LocalPhoneIcon className="icon" />
                <p>
                  00 (440) 9865 562 <br />
                  <span>Mon to Fri 9am to 6 pm</span>
                </p>
              </div>
              <div className="mail">
                <EmailIcon className="icon" />
                <p>
                  support@colorlib.com <br />
                  <span>Send us your query anytime!</span>
                </p>
              </div>
            </div>
            {/* Contact Form-- */}
            <div>
              <form className="contact-form" onSubmit={sendMailHanlder}>
                <div className="input-div">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-div">
                  <label htmlFor="subject"></label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="input-textarea-div">
                  <label htmlFor="message"></label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Enter message"
                    className="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
