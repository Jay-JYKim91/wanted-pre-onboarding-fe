import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import StorageIcon from '@mui/icons-material/Storage'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './page/Auth'
import Main from './page/Main'

function App() {
  const accessToken = window.localStorage.getItem('accessToken')
  const navigate = useNavigate()

  return (
    <div>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <StorageIcon sx={{ mr: 1 }} />
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Todo App
              </Typography>
              {accessToken !== '' && (
                <Button
                  onClick={() => {
                    const confirm = window.confirm('Are you sure you want to log out?')

                    if (confirm) {
                      window.localStorage.setItem('accessToken', '')
                      navigate('/')
                    }
                  }}
                >
                  <LogoutIcon sx={{ color: 'white' }} />
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </header>

      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/todo' element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
