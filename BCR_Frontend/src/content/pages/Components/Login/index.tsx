import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  TextField,
  Alert,
  AlertProps,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

interface IAlert extends AlertProps {
  message: string;
}

function Login() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = useState<IAlert>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password }
      );

      const token = response.data.data;
      localStorage.setItem("token", token);

      setAlert({
        message: "Login success!",
        severity: "success",
      });
      navigate("/management/products");
    } catch (error) {
      if (error instanceof AxiosError) {
        return setAlert({
          message: error?.response?.data?.message,
          severity: "error",
        });
      }
      setAlert({
        message: "Failed",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Binar Car Rentals</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Container maxWidth="sm">
            <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
              <Box textAlign="center">
                <img
                  alt="404"
                  height={180}
                  src="/static/images/status/404.svg"
                />
                <Typography variant="h2" sx={{ my: 2 }}>
                  Login
                </Typography>
              </Box>
              <div
                style={{
                  width: "100%",
                }}
              >
                {alert && alert.message && (
                  <Alert severity={alert.severity}>{alert.message}</Alert>
                )}
                <FormControl
                  sx={{
                    "& .MuiTextField-root": { m: 1 },
                  }}
                  variant="outlined"
                  fullWidth
                >
                  <TextField
                    type="text"
                    label="Email"
                    placeholder="Your Email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      alignContent: "center",
                      alignSelf: "center",
                      width: "35%",
                    }}
                  >
                    Login
                  </Button>
                </FormControl>
              </div>
              <Divider sx={{ my: 4 }}>OR</Divider>
              <Button
                href="/register"
                variant="outlined"
                sx={{
                  alignContent: "center",
                  alignSelf: "center",
                  width: "35%",
                }}
              >
                Register
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Login;
