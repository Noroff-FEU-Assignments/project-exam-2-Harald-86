import { BASE_URL } from "../../constants/api";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("please enter title for your shout"),
  body: yup.string().max(280),
  media: yup.string(),
});

export default function UpdateModal({ refresh, id, body, title, media }) {
  const [success, setSuccess] = useState("");

  console.log("resf", refresh);
  const {
    register,
    handleSubmit,
    formState: { errors, successful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const update_URL = BASE_URL + `/social/posts/${id}`;
  const auth = useAxios();
  console.log(body);
  console.log(id);

  async function updatePost(data) {
    try {
      const response = await auth.put(update_URL, data);
      console.log("update response", response);

      if (response.status === 200) {
        setSuccess("Post updated");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(updatePost)}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" placeholder="title" defaultValue={title} {...register("title")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Media Url</Form.Label>
        <Form.Control name="media" placeholder="Url" defaultValue={media} {...register("media")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Shout</Form.Label>
        <Form.Control as="textarea" placeholder="body" name="title" defaultValue={body} {...register("body")} />
      </Form.Group>
      <Button onClick={refresh} className="btn btn-secondary cta" type="submit">
        Update Post
      </Button>
      {successful && <span className="update__success">{success}</span>}
    </Form>
  );
}
