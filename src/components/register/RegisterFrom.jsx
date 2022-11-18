import axios from "axios";
import { BASE_URL, register_url } from "../../constants/api";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ValidationError from "../common/FormError";
import { AlertBad, AlertRegister } from "../common/Alert";

const REG_URL = BASE_URL + register_url;

console.log(REG_URL);

const schema = yup.object().shape({
  name: yup.string().required("please enter a username"),
  email: yup.string().required("Please enter valid email that ends in @noroff.no"),
  password: yup.string().required("please enter a Password"),
});

export default function RegForm() {
  const [regError, setRegError] = useState(null);
  const [regSubmit, setRegSubmit] = useState(false);
  const [ok, setOk] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data, e) {
    console.log(data);

    try {
      const response = await axios.post(REG_URL, data);
      console.log("response", response);
      if (response.status === 201) {
        setOk(<AlertRegister alert="Account successfully created" />);
        e.target.reset();
      }
    } catch (error) {
      console.log("regform error :", error);
      setRegError(<AlertBad alert="Something went wrong, please try again later" />);
    } finally {
      setRegSubmit(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {regError && <ValidationError>{regError}</ValidationError>}
        <div>{ok}</div>
        <fieldset disabled={regSubmit}>
          <Form.Group>
            <Form.Control name="name" placeholder="name" {...register("name")} />
            {errors.name && <ValidationError>{errors.name.message}</ValidationError>}
          </Form.Group>
          <Form.Group>
            <Form.Control name="email" placeholder="email" {...register("email")} />
            {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
          </Form.Group>
          <Form.Group>
            <Form.Control name="password" placeholder="password" {...register("password")} />
            {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
          </Form.Group>
          <Button type="submit">{regSubmit ? "All good.." : "Register"}</Button>
        </fieldset>
      </Form>
    </>
  );
}
