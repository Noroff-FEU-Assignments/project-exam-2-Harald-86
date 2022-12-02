import useAxios from "../../hooks/useAxios";
import { BASE_URL } from "../../constants/api";

export default function ReactToPost({ post }) {
  const symbol = "😍";
  const auth = useAxios();
  const react_URL = BASE_URL + `/social/posts/${post}/react/${symbol}`;

  async function sendSymbol() {
    try {
      const reaction = await auth.put(react_URL);
      console.log("reaction", reaction);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div onClick={() => sendSymbol()} className="emoji">
      😍
    </div>
  );
}
