import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import defaultImg from "../../assets/default-profile-2.png";
import { updateUser } from "../../redux/userSlice/userSlice";
import "./edit.css";
import { useDispatch } from "react-redux";

const Edit = ({ user }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        email: user.email,
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (data.image instanceof File) {
            setPreview(URL.createObjectURL(data.image));
        }
    }, [data.image]);

    // E-mail validation
    const validateEmail = (email) => {
        // Regular expression for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const { firstname, lastname, image, email } = data;
        if (!firstname || !lastname || !email) {
            alert("Please fill the form completely...");
        } else {
            if (validateEmail(email)) {
                dispatch(updateUser({ ...data, image: preview ? preview : image }));
            } else {
                alert("Invalid email");
            }

            handleClose();
            setData({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                image: user.image,
                email: user.email,
            });

            setPreview("");
        }
    };

    return (
        <>
            <IconButton
                aria-label="edit rounded_btn"
                title="EDIT"
                className="edit_btn"
                onClick={handleShow}
            >
                <FaEdit />
            </IconButton>

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
                            src={preview ? preview : user.image ? user.image : defaultImg}
                            alt=""
                        />
                    </label>

                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="ID"
                            className="mb-3"
                            readOnly
                            value={user.id}
                        />
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            className="mb-3"
                            onChange={(e) => setData({ ...data, firstname: e.target.value })}
                            value={data.firstname}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            className="mb-3"
                            onChange={(e) => setData({ ...data, lastname: e.target.value })}
                            value={data.lastname}
                        />
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            className="mb-3"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            value={data.email}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Edit;
