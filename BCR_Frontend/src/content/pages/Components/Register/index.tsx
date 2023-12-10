import { FormEvent, useState, ChangeEvent } from "react";
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
  Select,
  MenuItem,
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

interface Roles {
  name?: string;
}

function Register() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = useState<IAlert>();
  const [roles, setRoles] = useState<Roles>({ name: "user" })
  const navigate = useNavigate();

  const rolesOptions = [
    {
      id: "user",
      name: "User",
      value: "user",
    },
    {
      id: "admin",
      name: "Admin",
      value: "admin",
    },
    {
      id: "superadmin",
      name: "Super Admin",
      value: "superadmin",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<{ value: unknown }>): void => {
    const value = e.target.value;
    console.log("value >>>", value);
    const selectedOption = rolesOptions.find((option) => option.id === value);

    if (selectedOption) {
      console.log("Selected Option:", selectedOption.value);
      setRoles((prevFilters) => ({
        ...prevFilters,
        name: selectedOption.value,
      }));
    } else {
      console.log("No matching option found for value:", selectedOption?.value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        { 
          username: username,
          email: email, 
          password: password, 
          role: roles?.name }
      );

      setAlert({
        message: "Register success!",
        severity: "success",
      });
      navigate("/login");
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
        <title>Register - Binar Car Rentals</title>
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
                  Register
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
                    label="User Name"
                    placeholder="Your User Name"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    type="text"
                    label="Email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Select
                    value={roles.name}
                    onChange={handleStatusChange}
                    sx={{
                      width: "45%",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginBottom: "2rem"
                    }}
                  >
                    {rolesOptions.map((roleOption) => (
                      <MenuItem key={roleOption.id} value={roleOption.value}>
                        {roleOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      alignContent: "center",
                      alignSelf: "center",
                      width: "35%",
                    }}
                  >
                    Register
                  </Button>
                </FormControl>
              </div>
              <Divider sx={{ my: 4 }}>OR</Divider>
              <Button
                href="/login"
                variant="outlined"
                sx={{
                  alignContent: "center",
                  alignSelf: "center",
                  width: "35%",
                }}
              >
                Login
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Register;
