import { useState, useEffect } from "react";
import "./CommonPostDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetails() {
  const [post, setPost] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(postsData?.data);
    };
    if (!Object.keys(post)?.length) {
      fetchData();
    }
  }, [post, id]);

  console.log("here data22", post);

  return (
    <div>
      <header className="App-header postDetail">
        <u>
          <h2>{post.title}</h2>
        </u>
        <p>{post.body}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/editPost/${id}`;
          }}
          class="button"
        >
          Edit Post
        </button>
      </header>
    </div>
  );
}

export default PostDetails;
