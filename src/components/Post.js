import React,{useState} from "react";
import {Link} from 'react-router-dom'
import { Col, Card, Row, Button, Alert, Container } from "react-bootstrap";
import Swal from 'sweetalert2' 
const Post = ({ post }) => {
  const { body, title, id } = post;

  const [error, setError] = useState(false);

  const eliminarPost = (id) => {
    setError(false)
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}
    `,
      {
        method: "DELETE",
      }
    )
      .then((res) =>{
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta acción", 
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El post fue elimnado con éxito.',
                'success'
              )
            }
          })
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <Container className="my-4">
      {error ? <Alert variant="danger">Hubo un error</Alert> : null}
      <Col>
        <Card border="info" className="my-2">
          <Card.Body className="text-justify">
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Row className="ml-auto mx-1">
            <Button
              variant="danger"
              className="ml-auto mx-1"
              onClick={eliminarPost}
            >
              Eliminar
            </Button>{" "}
            <Button variant="warning" className="ml-auto mx-1">
              Editar
            </Button>{" "}
            <Button variant="info">Detalle</Button>{" "}
          </Row>
        </Card>
      </Col>
    </Container>
  );
};

export default Post;
