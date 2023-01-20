import { useState } from "react";
import "./CommonPostDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateEditPostDetails() {
  const [postData, setPostData] = useState({});
  const [error, setError] = useState(false);
  let { editId } = useParams();
  let isEdit = false;

  const fetchData = async () => {
    const postsData = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${editId}`
    );
    setPostData(postsData?.data);
  };

  if (window.location.pathname.includes("editPost") && editId) {
    if (!Object.keys(postData)?.length) {
      fetchData();
    }
    isEdit = true;
  }
  return (
    <div>
      <header className="App-header postDetail">
        <h1>{isEdit ? "Edit Post" : "Add New Post"}</h1>
        <p>Title</p>
        <input
          type="text"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          value={postData.title}
          name="task"
          required
          width="10px"
          size="40"
        />
        <p>Content</p>
        <textarea
          type="text"
          onChange={(e) => setPostData({ ...postData, body: e.target.value })}
          value={postData.body}
          rows="8"
          cols="100"
        />
        {error && <span id="error">Please enter valid Title and Content</span>}
        <button
          onClick={() => {
            if (!postData.title || !postData.body) {
              setError(true);
              return;
            }
            axios({
              method: isEdit ? "put" : "post",
              url: "https://jsonplaceholder.typicode.com/posts",
              data: JSON.stringify({
                ...postData,
                userId: 1,
              }),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then(function (response) {
              console.log(response);
            });
            window.location.href = "/";
          }}
          className="button"
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </header>
    </div>
  );
}

export default CreateEditPostDetails;
