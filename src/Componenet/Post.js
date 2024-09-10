import React, { useEffect, useState } from "react";

const Post = () => {
  const [post, setpost] = useState([]);
  const [page, setpage] = useState(1);

  const getpostdata = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}}&_limit=5`
    );
    const data = await res.json();
    // console.log(data)
    setpost((prev) => [...prev, ...data]);
  };
  const handalofscroll = async () => {
    // console.log(" scrollhight" + document.documentElement.scrollHeight);
    // console.log(" scrollinerhight " + window.innerHeight);
    // console.log("scrollTop " + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setpage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handalofscroll);
  }, []);

  useEffect(() => {
    getpostdata();
  }, [page]);

  return (
    <>
      {post.map((post) => (
        <div className="post">
          <h2>{post.title} </h2>
          <p> {post.body}</p>
        </div>
      ))}
    </>
  );
};

export default Post;
