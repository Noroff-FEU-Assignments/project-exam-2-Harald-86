export default function Username() {
  const getUsername = JSON.parse(localStorage.getItem("auth"));
  const username = getUsername.name;
  return <div className="profile__username">{username}</div>;
}
