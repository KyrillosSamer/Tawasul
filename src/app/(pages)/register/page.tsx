'use client';

import React, { useEffect, useState } from 'react';
import {
  Paper, TextField, Container, Typography, Button,
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl
} from '@mui/material';
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

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    rePassword: '',
  });

  const { isLoading, error } = useSelector((state: any) => state.auth);

  // 🔻 حذف فلاج الـ loading من sessionStorage
  useEffect(() => {
    sessionStorage.removeItem('loading-register');
  }, []);

  const validate = () => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and a number.';
    }

    if (formData.password !== formData.rePassword) {
      newErrors.rePassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

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
        setErrors({});
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
            fullWidth label="Name" name="name"
            value={formData.name}
            onChange={handleChange}
            variant="standard" sx={{ mb: 2 }}
          />

          <TextField
            fullWidth label="Email" name="email"
            value={formData.email}
            onChange={handleChange}
            type="email" variant="standard" sx={{ mb: 2 }}
            error={Boolean(errors.email)}
            helperText={errors.email || 'Enter a valid email like example@mail.com'}
          />

          <TextField
            fullWidth label="Password" name="password"
            value={formData.password}
            onChange={handleChange}
            type="password" variant="standard" sx={{ mb: 2 }}
            error={Boolean(errors.password)}
            helperText={errors.password || 'At least 8 chars with uppercase, lowercase, and number'}
          />

          <TextField
            fullWidth label="Re-enter Password" name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            type="password" variant="standard" sx={{ mb: 2 }}
            error={Boolean(errors.rePassword)}
            helperText={errors.rePassword || 'Must match the password'}
          />

          <TextField
            fullWidth label="Date of Birth"
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
              row name="gender"
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
