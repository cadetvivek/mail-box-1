import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MessageDetails = () => {
  const { messageId } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const sentMail = localStorage
      .getItem("email")
      .replace(".", "")
      .replace("@", "");

    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(
          `https://mail-box-client-72574-default-rtdb.firebaseio.com//${sentMail}/${messageId}.json`
        );
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessageDetails();
  }, [messageId]);

  if (!message) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="text-warning">
        <h2>Message Details</h2>
        {/* {console.log(message)} */}
        {/* <p>ID: {message.id}</p> */}
        <p>Message: {message.message}</p>
        {/* <p>Send To: {message.sendTo}</p> */}
        {/* <p>Subject: {message.subject}</p> */}
      </div>
    </div>
  );
};

export default MessageDetails;
