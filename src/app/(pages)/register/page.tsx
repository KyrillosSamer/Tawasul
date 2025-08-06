'use client';

import React, { useState } from 'react';
import {
  Paper, TextField, Container, Typography, Button,
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '@/lib/authSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    gender: 'male',
    dateOfBirth: '',
  });

  const { isLoading, error } = useSelector((state: any) => state.auth);

  // حالة إظهار/إخفاء الباسورد
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(handleRegister(formData) as any)
      .unwrap()
      .then(() => {
        toast.success("Registered successfully!");
        setFormData({
          name: '',
          email: '',
          password: '',
          rePassword: '',
          gender: 'male',
          dateOfBirth: '',
        });
      })
      .catch((err: string) => {
        toast.error(err);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ my: 10 }}>
      <Paper elevation={10} sx={{ p: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#e50350', textAlign: 'center' }}>
          Register Now
        </Typography>

        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            variant="standard"
            sx={{ mb: 2 }}
            helperText="Password must contain uppercase, lowercase letters, a symbol, and numbers, e.g. Kyrillos@123"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Re-enter Password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            type={showRePassword ? "text" : "password"}
            variant="standard"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showRePassword ? "Hide password" : "Show password"}
                    onClick={toggleShowRePassword}
                    edge="end"
                  >
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              border: '1px solid black',
              my: 2,
              color: 'white',
              bgcolor: '#e50350',
              ':hover': {
                bgcolor: '#e50360',
              },
            }}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>

          {error && (
            <Typography color="error" align="center">{error}</Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
}
