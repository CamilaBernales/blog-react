import React, { useState, useEffect } from "react";
import Post from "./Post";
import {Row} from 'react-bootstrap'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const obtenerPost = async () => {
    const solicitud = await fetch(
      ` https://jsonplaceholder.typicode.com/posts`
    );
    const respuesta = await solicitud.json();
    console.log(respuesta);
    setPosts(respuesta);
  };

  useEffect(() => {
    obtenerPost();
  }, []);
  return (
    <Row className="d-flex justify-content-center align-items-center">
      {posts.map((post) => (
        <Post id={post.id} post={post} />
      ))}
    </Row>
  );
};

export default Posts;
