import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Row, Button, Alert, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const Post = ({ post, obtenerPostsFiltrados }) => {
  const { title, id } = post;
  const [error, setError] = useState(false);

  const eliminarPost = async (id) => {
    setError(false);
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}
    `,
      {
        method: "DELETE",
      }
    );
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          obtenerPostsFiltrados(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <Container className="my-4">
      {error ? <Alert variant="danger">Hubo un error</Alert> : null}
      <Col>
        <Card key={id} border="info" className="my-2">
          <Card.Body className="text-justify">
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Row className="ml-auto mx-1">
            <Button
              variant="danger"
              className="ml-auto mx-1"
              onClick={() => {
                eliminarPost(id);
              }}
            >
              Eliminar
            </Button>{" "}
            <Link to={`/post/update/${id}`}>
              <Button variant="warning" className="ml-auto mx-1">
                Editar
              </Button>{" "}
            </Link>
            <Link to={`/post/detalle/${id}`}>
              <Button variant="info">Detalle</Button>{" "}
            </Link>
          </Row>
        </Card>
      </Col>
    </Container>
  );
};

export default Post;
