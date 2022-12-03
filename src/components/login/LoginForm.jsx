import { useState, useContext } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, auth_url } from "../../constants/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ValidationError from "../common/FormError";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + auth_url;

const schema = yup.object().shape({
  email: yup.string().required("Please enter username/email"),
  password: yup.string().required("Please enter password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // eslint-disable-next-line
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log(response);
      console.log("response data :", response.data);
      setAuth(response.data);

      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      setLoginError(<div className="message__error">Username or password is wrong.</div>);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <ValidationError>{loginError}</ValidationError>}
        <fieldset disabled={submitting}>
          <Form.Group>
            <Form.Control name="email" placeholder="email" {...register("email")} />
            {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" name="password" placeholder="password" {...register("password")} />
            {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
          </Form.Group>
          <Button type="submit">{submitting ? "Loggin in.." : "Login"}</Button>
        </fieldset>
      </Form>
    </>
  );
}
