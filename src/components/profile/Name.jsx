export default function Username() {
  const getUsername = JSON.parse(localStorage.getItem("auth"));
  const username = getUsername.name;
  return <p className="giveMeAClassPlease">{username}</p>;
}
