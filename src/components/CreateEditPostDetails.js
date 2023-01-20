import { useState } from "react";
import "./CommonPostDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateEditPostDetails() {
  const [postData, setPostData] = useState({});
  let { editId } = useParams();
  let pageHeading = "Add New Post";
  let updateButton = "Add";

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
    pageHeading = "Edit Post";
    updateButton = "Update"
  }

  return (
    <div>
      <header className="App-header postDetail">
        <h1>{pageHeading}</h1>
        <p>Title</p>
        <input
          type="text"
          onChange={(e) => setPostData({ title: e.target.value })}
          value={postData.title}
          name="task"
          required
          width="10px"
          size="40"
        />
        <p>Content</p>
        <textarea
          type="text"
          onChange={(e) => setPostData({ body: e.target.value })}
          value={postData.body}
          rows="8"
          cols="100"
        />
        <button
          onClick={() => {
            axios({
              method: "post",
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
          class="button"
        >
          {updateButton}
        </button>
      </header>
    </div>
  );
}

export default CreateEditPostDetails;
