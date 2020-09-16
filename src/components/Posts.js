import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Row } from "react-bootstrap";

const Posts = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("post_filtrados")) || []
  );
  const obtenerPost = async (id = 0) => {
    const solicitud = await fetch(
      ` https://jsonplaceholder.typicode.com/posts`
    );
    if (id != 0) {
      var respuesta = await solicitud.json();
      let filtro = respuesta.filter((post) => post.id !== id);
      let filtrados = localStorage.setItem(
        "post_filtrados",
        JSON.stringify(filtro)
      );
      setPosts(JSON.parse(localStorage.getItem("post_filtrados")));
    } else {
      respuesta = await solicitud.json();
      setPosts(respuesta);
    }
  };

  useEffect(() => {
    obtenerPost();
  }, []);
  return (
    <Row className="d-flex justify-content-center align-items-center">
      {posts.map((post) => (
        <Post id={post.id} post={post} obtenerPost={obtenerPost} />
      ))}
    </Row>
  );
};

export default Posts;
