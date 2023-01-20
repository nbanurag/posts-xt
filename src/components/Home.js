import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "react-crud-icons";
import "./CommonPostDetails.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const postsData = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setData(postsData?.data);
    };
    console.log('11111111',data);
    if (!data?.length) {
      fetchData();
    }
  }, [data]);

  // console.log("here data", data);

  return (
    <div>
      <header className="App-header">
        <h1>Listed Posts</h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/createPost";
          }}
          class="button"
        >
          Add New Post
        </button>
        <table>
          <tr>
            <th>Title</th>
            <th>Delete</th>
          </tr>
          {data.map(({ title, id }) => (
            <tr>
              <td>
                <a href={`/post/${id}`}>{title}</a>
              </td>
              <td className="textAlignCenter">
                <Icon
                  className={"iconClaass"}
                  name="delete"
                  tooltip="Delete"
                  theme="none"
                  size="medium"
                  onClick={async () => {
                    await axios.delete(
                      `https://jsonplaceholder.typicode.com/posts/${id}`
                    );
                    setData((data) => data.filter((obj) => obj.id !== id));
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </header>
    </div>
  );
}

export default App;
