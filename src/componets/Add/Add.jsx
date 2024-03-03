import React, { useEffect, useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import defaultImg from "../../assets/default-profile-2.png";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/userSlice/userSlice";

const Add = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer);
  // console.log(users);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    image: "",
    email: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (data.image) {
      setPreview(URL.createObjectURL(data.image));
    }
  }, [data.image]);

  // E-mail validation
  const validateEmail = (email) => {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { firstname, lastname, email } = data;
    if (!firstname || !lastname || !email) {
      alert("Please fill the form completely...");
    } else {
      const mailExist = users.find((user) => user.email === email);

      if (mailExist) {
        alert("User or Email already exists");
      } else {
        if (validateEmail(email)) {
          dispatch(addUser({ ...data, image: preview }));
          alert("New user added Successfully");
        } else {
          alert("Invalid email");
        }
      }

      handleClose();
      setData({
        id: "",
        firstname: "",
        lastname: "",
        image: "",
        email: "",
      });

      setPreview("");
    }
  };

  return (
    <>
      <Button variant="outlined" startIcon={<TiUserAdd />} onClick={handleShow}>
        ADD USER
      </Button>

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid modalBody">
          <label className="image_input">
            <input
              type="file"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
            <img
              height={"200px"}
              width={"200px"}
              src={preview ? preview : defaultImg}
              alt=""
            />
          </label>

          <Form>
            <Form.Control
              type="text"
              placeholder="ID"
              readOnly
              value={users.length + 1}
              className="mb-3"
              onChange={(e) => setData({ ...data, id: users.length + 1 })}
            />
            <Form.Control
              type="text"
              placeholder="First name"
              className="mb-3"
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="Last name"
              className="mb-3"
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-3"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
