import React, { useState } from "react";
import postalta from "../images/postalta.svg";
import Swal from "sweetalert2";

import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
const Alta = () => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  const { title, body } = post;
  const [error, setError] = useState(false);
  const[msgError, setMsgError] =  useState("");
  const onChangeForm = (e) => {
    setError(false);
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      setError(true);
      setMsgError("Hubo un error.")
      return;
    }
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: post,
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Posteo guardado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
        let datosLS = JSON.parse(localStorage.getItem("post_filtrados")) || [];
        datosLS.push(post);
        localStorage.setItem("post_filtrados", JSON.stringify(datosLS));
      })
      .catch((err) => {
        setError(true)
        setMsgError("Hubo un error.")
      });
  };
  return (
    <Container className="m-auto ">
      {error ? (
        <Alert variant="danger">{msgError}</Alert>
      ) : null}
      <Row className="px-5 d-flex justify-content-center align-items-center ">
        <Col sm={12} md={8} xl={6} lg={8} className=" mx-3 my-3">
          <img src={postalta} className="img-fluid" alt="imagen login" />
        </Col>
        <Col sm={12} lg={6} md={8} xl={5}>
          <Form onSubmit={onSubmitForm}>
            <h3 className="text-center my-2">Nuevo Post</h3>
            <Form.Group>
              <Form.Label className=" d-flex justify-content-start">
                Titulo:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el titulo del post"
                className="rounded-left"
                name="title"
                value={title}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="d-flex justify-content-start">
                Post:
              </Form.Label>
              <Form.Control
                className="rounded-left"
                type="text"
                name="body"
                value={body}
                onChange={onChangeForm}
              />
            </Form.Group>
            <Row>
              <Col className="justify-content-center mb-3">
                <Button
                  variant="info"
                  className="text-white btn btn-button w-100"
                  type="submit"
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Alta;
