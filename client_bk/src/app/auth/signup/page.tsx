"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import styles from "../../../styles/page.module.css";
import useRequest from "@/hooks/use-request";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRequest, _error] = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.push("/"),
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <h1 className={styles.title}>Welcome to Stubhub</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              value={email}
              label="Email"
              variant="outlined"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              value={password}
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
