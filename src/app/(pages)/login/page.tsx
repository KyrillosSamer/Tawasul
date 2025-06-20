'use client';
import React from 'react'
import { Paper, TextField, Container, Typography, Button } from '@mui/material'
import { useFormik } from 'formik'
import { handleLogin } from '@/lib/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, stateType } from '@/lib/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
let router = useRouter()
  const dispatch = useDispatch<dispatchType>();
  const { token, isLoading } = useSelector((state: stateType) => state.auth);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      const resultAction = await dispatch(handleLogin(values));

      if (handleLogin.fulfilled.match(resultAction)) {
        toast.success("Welcome back!");
        //  redirect  
        router.push("/")

      } else if (handleLogin.rejected.match(resultAction)) {
        toast.error("Incorrect Email or Password");
      }
    }
  });

  return (
    <Container maxWidth="sm" sx={{ my: 10 }}>
      <Paper elevation={10} sx={{ p: 5 }}>
        <Typography variant="h6" color="#e50350" sx={{ textAlign: 'center' }}>
          Login Now
        </Typography>

        <form onSubmit={loginFormik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email..."
            type="email"
            variant="standard"
            sx={{ mb: 2 }}
            value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password..."
            type="password"
            variant="standard"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              border: '1px solid black',
              my: 2,
              color: 'white',
              bgcolor: '#e50350',
              ":hover": {
                bgcolor: '#e50390',
                color: 'white'
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
