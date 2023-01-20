import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import CreateEditPostDetails from "./components/CreateEditPostDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/createPost" element={<CreateEditPostDetails />} />
      <Route path="/editPost/:editId" element={<CreateEditPostDetails />} />
    </Routes>
  </BrowserRouter>
  );
}

export default AppRoutes;
