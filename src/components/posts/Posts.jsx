import Heading from "../common/Heading";
import GetAllPosts from "./GetAllPosts";

export default function Posts() {
  console.log("Hello");
  document.title = "Explore all posts";
  return (
    <>
      <Heading size="1" title="All posts" />
      <GetAllPosts />
    </>
  );
}
