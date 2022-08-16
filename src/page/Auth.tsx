import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AuthAPI from '../services/authAPI'

const authAPI = new AuthAPI()

type LogInOrSignUp = 'logIn' | 'signUp'

export type AuthData = {
  email: string
  password: string
}

type AuthResponse = {
  access_token: string
}
interface messageComponentProps {
  currentStatus: LogInOrSignUp
  onClick: () => void
}

function Message({ currentStatus, onClick }: messageComponentProps) {
  return (
    <Grid container justifyContent='flex-end'>
      <Typography sx={{ display: 'inline' }}>
        {currentStatus === 'logIn' ? 'Need an account? ' : 'Already a user? '}
      </Typography>
      <Button sx={{ padding: 0, marginLeft: 1, fontWeight: 'bold' }} onClick={onClick}>
        {currentStatus === 'logIn' ? 'SIGN UP' : 'LOGIN'}
      </Button>
    </Grid>
  )
}

function Auth() {
  const [logInOrSignUp, setLogInOrSignUp] = useState<LogInOrSignUp>('logIn')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const navigate = useNavigate()
  const accessToken = window.localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken !== '') {
      navigate('/todo')
    }
  }, [accessToken])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!emailRegex.test(emailInput)) {
      window.alert('Please enter an email address.')
    } else if (passwordInput.length < 8) {
      window.alert('Password should have at least 8 characters.')
    } else {
      handleLogInOrSignUp()
    }
  }

  function handleLogInOrSignUp() {
    const data = {
      email: emailInput,
      password: passwordInput,
    }

    if (logInOrSignUp === 'logIn') {
      authAPI
        .logIn(data)
        .then((result: AuthResponse) => {
          if (result.access_token) {
            window.localStorage.setItem('accessToken', result.access_token)
            setEmailInput('')
            setPasswordInput('')
            navigate('/todo')
          }
        })
        .catch((error) => alert(error))
    } else if (logInOrSignUp === 'signUp') {
      authAPI
        .signUp(data)
        .then((result: AuthResponse) => {
          if (result.access_token) {
            window.alert('Thanks for signing up. You can login now.')
            setEmailInput('')
            setPasswordInput('')
            setLogInOrSignUp('logIn')
          }
        })
        .catch((error) => alert(error))
    }
  }

  return (
    // <ThemeProvider theme={theme}>
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {logInOrSignUp.toUpperCase()}
        </Typography>
        <Box
          component='form'
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            inputProps={{ minLength: 8 }}
            autoComplete='current-password'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            {logInOrSignUp.toUpperCase()}
          </Button>
          <Message
            currentStatus={logInOrSignUp}
            onClick={() => setLogInOrSignUp(logInOrSignUp === 'logIn' ? 'signUp' : 'logIn')}
          />
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  )
}

export default Auth
