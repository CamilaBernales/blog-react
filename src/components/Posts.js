import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Row } from "react-bootstrap";

const Posts = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("post_filtrados")) || []
  );

  const obtenerPost = async () => {
    const request = await fetch(
      ` https://jsonplaceholder.typicode.com/posts`
    );
    var res = await request.json();
    localStorage.setItem("post_filtrados", JSON.stringify(res))
    setPosts(res);
  };
  const obtenerPostsFiltrados = (id) => {
    if (id !== 0) {
      let postGuardados = JSON.parse(localStorage.getItem("post_filtrados"));
      let filtro = postGuardados.filter((post) => post.id !== id);
      localStorage.setItem("post_filtrados", JSON.stringify(filtro));
      setPosts(filtro);
    }
  };
  useEffect(() => {
    if (posts.length === 0) {
      obtenerPost();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Row className="d-flex justify-content-center align-items-center">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          obtenerPostsFiltrados={obtenerPostsFiltrados}
        />
      ))}
    </Row>
  );
};

export default Posts;
