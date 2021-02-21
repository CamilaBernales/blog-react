import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Row, Button, Alert, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import "../css/style.css";

const Post = ({ post, obtenerPostsFiltrados }) => {
  const { title, id } = post;
  const [error, setError] = useState(false);

  const deletePost = async (id) => {
    setError(false);
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}
    `,
      {
        method: "DELETE",
      }
    );
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir estas acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar.",
    })
      .then((result) => {
        if (result.isConfirmed) {
          obtenerPostsFiltrados(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center align-items-center">
        {error ? (
          <Alert className="text-center" variant="danger">
            Hubo un error
          </Alert>
        ) : null}
        <Col sm={12} md={8} lg={8}>
          <Card key={id} border="info" className="my-2 post">
            <Card.Body className="text-justify">
              <Card.Title>{title}</Card.Title>
            </Card.Body>
            <Row className="ml-auto mx-1">
              <Button
                variant="danger"
                className="ml-auto mx-2 mb-2 btn btn-delete"
                onClick={() => {
                  deletePost(id);
                }}
              >
                Eliminar
              </Button>{" "}
              <Link to={`/post/update/${id}`}>
                <Button
                  variant="warning"
                  className="ml-auto mx-2 mb-2 btn-editar btn"
                >
                  Editar
                </Button>{" "}
              </Link>
              <Link to={`/post/detalle/${id}`}>
                <Button variant="dark" className="ml-auto mx-2 mb-2 btn-detalle btn">
                  Detalle
                </Button>{" "}
              </Link>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
