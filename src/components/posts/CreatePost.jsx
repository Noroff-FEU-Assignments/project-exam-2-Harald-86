import useAxios from "../../hooks/useAxios";
import Heading from "../common/Heading";
import * as yup from "yup";
/* import Loader from "../common/Loader"; */
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../../constants/api";
import { AlertBad, AlertGood } from "../common/Alert";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
/* const reg =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm; */

const schema = yup.object().shape({
  title: yup.string().required("please enter tile for your shout"),
  body: yup.string(),
  media: yup.string(),
});

export default function CreatePost() {
  const createEntry_URL = BASE_URL + "/social/posts";
  console.log("entry URl", createEntry_URL);
  const [entryError, setEntryError] = useState(null);
  const authenticate = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function createEntry(data, e) {
    console.log("data", data);
    try {
      const entryResponse = await authenticate.post(createEntry_URL, data);
      console.log("Did i make a post?", entryResponse);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setEntryError(<AlertBad alert="Koble is sick, please try again later" />);
    }
  }

  return (
    <div className="form__container">
      <Form onSubmit={handleSubmit(createEntry)}>
        <Row>
          <Col sm={12} md={4}>
            <Form.Control name="title" placeholder="Title" {...register("title")} />
          </Col>

          <Col sm={12} md={4}>
            <Form.Control name="media" placeholder="Image Url" {...register("media")} />
          </Col>
        </Row>
        <Form.Control
          as="textarea"
          rows={3}
          name="body"
          placeholder="My message to the KobleUnivers"
          {...register("body")}
        />

        <Button type="submit" className="btn-secondary btn">
          Shout
        </Button>
      </Form>
    </div>
  );
}
