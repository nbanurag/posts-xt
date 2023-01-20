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
    if (!data?.length) {
      fetchData();
    }
  }, [data]);

  return (
    <div>
      <header className="App-header">
        <h1>Listed Posts</h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/createPost";
          }}
          className="button"
        >
          Add New Post
        </button>
        <table>
          <tbody>
          <tr>
            <th>Title</th>
            <th>Delete</th>
          </tr>
          {data.map(({ title, id }) => (
            <tr id={id}>
              <td id={`${id}-a`}>
                <a href={`/post/${id}`}>{title}</a>
              </td>
              <td className="textAlignCenter" id={`${id}-td`}>
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
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
