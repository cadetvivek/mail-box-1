import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SentBox = () => {
  const [sentboxArr, setSentboxArr] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const FetchSentEmails = async () => {
      const sentMail = localStorage
        .getItem("email")
        .replace(".", "")
        .replace("@", "");
      const response = await axios.get(
        `https://mail-box-client-72574-default-rtdb.firebaseio.com/${sentMail}.json`
      );

      console.log(response);

      const data = response.data;
      const updatedSentboxArr = [];

      for (const key in data) {
        updatedSentboxArr.push({ id: key, ...data[key] });
      }

      setSentboxArr(updatedSentboxArr);
      setIsLoading(false);
    };

    FetchSentEmails();
  }, []);

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card
        className="w-75"
        style={{
          background: "transparent",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          color: "white",
        }}
      >
        <Card.Body>
          <Card.Title style={{ color: "#555555" }}>Sent Box</Card.Title>
          {loading && <p>...loading</p>}
          {!loading && (
            <>
              {sentboxArr.length === 0 ? (
                <p>Sent box is empty</p>
              ) : (
                sentboxArr.map((email) => (
                  <div key={email.id} className="mb-3 pb-3 border-bottom">
                    <p className="mt-2">
                      <strong>Send To:</strong> {email.sendTo}
                    </p>
                    <p>
                      <strong>Subject:</strong> {email.subject}
                    </p>
                    <Link
                      to={`/messages/${email.id}`}
                      className="text-decoration-none"
                    >
                      <Button variant="dark" style={{ background: "purple" }}>
                        View Message
                      </Button>
                    </Link>
                  </div>
                ))
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SentBox;
