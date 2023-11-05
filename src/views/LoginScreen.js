import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/UserAction";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const submitHandler = (e) => {
    // Todo
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Toast />
      <Container
        maxW="container.lg"
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <Heading as="h4" size="lg" className="card-title mb-4 text-center">
            Login
          </Heading>
          <form onSubmit={submitHandler}>
            <Stack className="mb-3">
              <Input
                className="form-control"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
            <Stack className="mb-3">
              <Input
                className="form-control"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>

            <div className="mb-4">
              <Button
                type="submit"
                className="w-100 text-white"
                bg="blackAlpha.800"
              >
                Login
              </Button>
            </div>
          </form>
          <div>
            <Text>
              Email: <span>admin@gmail.com</span>
            </Text>

            <Text>
              Password: <span>admin</span>
            </Text>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
