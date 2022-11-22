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
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ValidationError from "../common/FormError";
/* const reg =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm; */

const schema = yup.object().shape({
  title: yup.string().required("please enter tile for your shout"),
  body: yup.string().max(200),
  media: yup.string(),

  /*  tags: yup.string(), */
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
      setEntryError();
    }
  }

  return (
    <Form onSubmit={handleSubmit(createEntry)} className="entry">
      {entryError && <ValidationError>{entryError}</ValidationError>}
      <Row>
        <Col sm={12} md={4}>
          <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
            <Form.Control name="title" placeholder="Title" {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </FloatingLabel>
        </Col>

        <Col sm={12} md={8}>
          <FloatingLabel controlId="floatingMedia" label="Media (Url only)" className="mb-3">
            <Form.Control name="media" placeholder="Image Url (optional)" {...register("media")} />
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel controlId="floatingTextarea" label="Shout it here!" className="mb-3">
        <Form.Control
          className="entry__textarea"
          as="textarea"
          style={{ height: "100px" }}
          a
          name="body"
          placeholder="My message to the KobleUnivers"
          {...register("body")}
        />
      </FloatingLabel>
      <Button type="submit" className="btn-secondary btn">
        Shout
      </Button>
    </Form>
  );
}
