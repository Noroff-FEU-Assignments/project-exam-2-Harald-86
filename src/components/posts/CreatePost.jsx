import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../../constants/api";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ValidationError from "../common/FormError";

const schema = yup.object().shape({
  title: yup.string().required("please enter title for your shout"),
  body: yup.string().max(280),
  media: yup.string(),
});

export default function CreatePost(props) {
  console.log("passed function", props);
  const createEntry_URL = BASE_URL + "/social/posts";
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
      console.log("Response: ", entryResponse);

      e.target.reset();
    } catch (error) {
      console.log("error", error);
      setEntryError(console.log(error)); // fix error and success message!
    }
  }

  return (
    <Form onSubmit={handleSubmit(createEntry)} className="entry">
      {entryError && <ValidationError>{entryError}</ValidationError>}
      <Row>
        <Col sm={12} md={4} className="entry__form">
          <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3 entry__label">
            <Form.Control name="title" className="entry__title" placeholder="Title" {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </FloatingLabel>
        </Col>

        <Col sm={12} md={8}>
          <FloatingLabel controlId="floatingMedia" label="Media (Url only)" className="mb-3 entry__label">
            <Form.Control
              name="media"
              className="entry__media"
              placeholder="Image Url (optional)"
              {...register("media")}
            />
            {errors.media && <ValidationError>{errors.media.message}</ValidationError>}
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel controlId="floatingTextarea" label="Shout it here!" className="mb-3 entry__label">
        <Form.Control
          className="entry__textarea"
          as="textarea"
          style={{ height: "100px" }}
          name="body"
          placeholder="My message to the KobleUnivers"
          {...register("body")}
        />
        {errors.body && <ValidationError>{errors.body.message}</ValidationError>}
      </FloatingLabel>
      <Button onClick={props.posts} type="submit" className="btn-secondary btn">
        Shout
      </Button>
    </Form>
  );
}
