import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ComposeMail from "./ComposeMail";
import { useSelector } from "react-redux";

const AfterLogin = () => {
  const [mail, setMail] = useState(false);
  const [variant, setaVariant] = useState("primary");
  const unreadCount = useSelector((state) => state.class.unreadCount);
  console.log(unreadCount);

  const mailHandler = () => {
    setMail(true);
    setaVariant("secondary");
  };

  const cancelHandler = () => {
    setMail(false);
    setaVariant("primary");
  };

  return (
    <div>
      <p className={`fs-4 pt-3 text-${variant}`}>Welcome to your Mail-Box</p>

      <div>
        <div>
          {!mail && (
            <Button variant="outline-success" onClick={mailHandler}>
              Compose Mail
            </Button>
          )}
          {mail && <ComposeMail />}
          {mail && (
            <Button variant="danger" className="m-2" onClick={cancelHandler}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfterLogin;
