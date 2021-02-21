import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Row, Col, Container, Alert } from "react-bootstrap";
const Detalle = () => {
  let { id } = useParams();
  const [error, setError] = useState(false);
  const [post, setPost] = useState(false);

  const fetchData = async () => {
    const request = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const res = await request.json();
    let postGuardados = JSON.parse(localStorage.getItem("post_filtrados"));
    let postBuscado = postGuardados.find((post) => post.id === res.id);
    if (postBuscado === undefined) {
      setError(true);
    }
    setPost(postBuscado);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <Container className="m-auto">
      <Row className="text-justify d-flex justify-content-center align-items-center">
        {error ? (
          <Alert variant="danger" className="text-center">
            El post que esta buscando no esta disponible o fue eliminado.
          </Alert>
        ) : (
          <Col lg={10} sm={12} md={8}>
            <h1 className="my-4">{post.title}</h1>
            <p className="mt-5">{post.body}</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Detalle;
