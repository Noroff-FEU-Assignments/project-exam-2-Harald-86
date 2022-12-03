import Heading from "../common/Heading";
import GetAllUsers from "./GetUsers";

export default function Users() {
  document.title = "All Users | Koble ";
  return (
    <>
      <Heading title="Explore Koble users" />
      <GetAllUsers />
    </>
  );
}
