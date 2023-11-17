import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComposeMail = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [sent, setsent] = useState(false);
  const navigate = useNavigate();

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleSendMail = async (event) => {
    event.preventDefault();

    let receivedEmail = recipient.replace(".", "").replace("@", "");
    let senderEmail = localStorage
      .getItem("email")
      .replace(".", "")
      .replace("@", "");

    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const message = rawContentState.blocks[0].text;

      await axios.post(
        `https://mail-box--inbox-default-rtdb.firebaseio.com//${receivedEmail}.json`,
        {
          from: senderEmail,
          subject: subject,
          message: message,
        }
      );

      await axios.post(
        `https://mail-box-client-72574-default-rtdb.firebaseio.com/${senderEmail}.json`,
        {
          sendTo: recipient,
          subject: subject,
          message: message,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setsent(true);
  };

  const sentHandler = () => {
    navigate("/sentbox");
  };

  const inboxHandler = () => {
    navigate("/inbox");
  };
  return (
    <>
      {!sent && (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={6}>
              <Card className="custom-card-bg">
                <Card.Body>
                  <Card.Title>Compose Mail</Card.Title>
                  <Form onSubmit={handleSendMail}>
                    <Form.Group>
                      <Form.Label htmlFor="recipient">Recipient</Form.Label>
                      <Form.Control
                        type="email"
                        id="recipient"
                        value={recipient}
                        onChange={handleRecipientChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="subject">Subject</Form.Label>
                      <Form.Control
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={handleSubjectChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label htmlFor="message">Message</Form.Label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={handleMessageChange}
                      />
                    </Form.Group>
                    <Button variant="secondary" type="submit" className="m-2">
                      Send
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Button variant="success" className="m-2" onClick={sentHandler}>
        SentBox
      </Button>
      <Button onClick={inboxHandler}>InBox</Button>
      {sent && <p className="text-success">Email sent successfully</p>}
    </>
  );
};

export default ComposeMail;
