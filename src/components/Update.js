import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const Update = () => {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [postUpdated, setPostUpdated] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [postsStorage, setpostsStorage] = useState(
    JSON.parse(localStorage.getItem("post_filtrados")) || []
  );
  const fetchPost = async () => {
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const res = await request.json();
    setPost(res);
  };

  const onChangePost = (e) => {
    setError(false);
    setPostUpdated({
      id: post.id,
      userId: post.userId,
      ...postUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const updatePost = async (e) => {
    e.preventDefault();
    if (postUpdated.title.trim() === "" || postUpdated.body.trim() === "") {
      setError(true);
      setMsgError("Los campos no deben estar vacios.");
      return;
    }
    setpostsStorage([
      ...postsStorage.filter((posts) => posts.id !== postUpdated.id),
      postUpdated,
    ]);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: postUpdated,
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Posteo editado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        setError(true);
        setMsgError("Hubo un error.");
      });
  };

  useEffect(() => {
    localStorage.setItem("post_filtrados", JSON.stringify(postsStorage));
     // eslint-disable-next-line
  }, [postsStorage]);

  useEffect(() => {
      fetchPost();
      // eslint-disable-next-line
  }, []);

  return (
    <Container className="m-auto">
      {error ? <Alert variant="danger">{msgError}</Alert> : null}
      <Row className="px-5 d-flex justify-content-center align-items-center ">
        <Col sm={12} lg={6} md={8} xl={5}>
          <Form onSubmit={updatePost} className="form-update p-3">
            <h3 className="text-center mb-3 pb-2">Modificar Post</h3>
            <Form.Group>
              <Form.Label className=" d-flex justify-content-start">
                Titulo:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el titulo del post"
                className="rounded-left"
                name="title"
                maxLength="100"
                // defaultValue={post.title}
                onChange={onChangePost}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="d-flex justify-content-start">
                Post:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="6"
                className="rounded-left"
                type="text"
                name="body"
                // defaultValue={post.body}
                onChange={onChangePost}
                maxLength="150"
              />
            </Form.Group>
            <Row>
              <Col className="justify-content-center mb-3">
                <Button
                  className="text-white btn btn-update btn-button my-3 w-100"
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

export default Update;
