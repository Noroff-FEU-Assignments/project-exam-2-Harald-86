import useAxios from "../../hooks/useAxios";
import Heading from "../common/Heading";
import * as yup from "yup";
/* import Loader from "../common/Loader"; */
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL } from "../../constants/api";
/* import { AlertBad, AlertGood } from "../common/Alert"; */
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ValidationError from "../common/FormError";

const schema = yup.object().shape({
  title: yup.string().required("please enter tile for your shout"),
  body: yup.string().max(200),
  media: yup.string(),
});

export default function CreatePost() {
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
      console.log("Did i make a post?", entryResponse);

      e.target.reset();
    } catch (error) {
      console.log(error);
      setEntryError(); // fix error and success message!
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
          a
          name="body"
          placeholder="My message to the KobleUnivers"
          {...register("body")}
        />
        {errors.body && <ValidationError>{errors.body.message}</ValidationError>}
      </FloatingLabel>
      <Button type="submit" className="btn-secondary btn">
        Shout
      </Button>
    </Form>
  );
}
