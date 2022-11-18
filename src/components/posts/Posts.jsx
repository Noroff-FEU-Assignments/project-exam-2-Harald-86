import Heading from "../common/Heading";
import GetAllPosts from "./GetAllPosts";

export default function Posts() {
  console.log("Hello");

  return (
    <>
      <Heading title="All posts" />
      <GetAllPosts />
    </>
  );
}
