import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Box, List } from '@mui/material'
import Todo from '../component/Todo'
import TodoAPI from '../services/todoAPI'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import TodoAddForm from '../component/TodoAddForm'
import { Navigate, useNavigate } from 'react-router-dom'

const todoAPI = new TodoAPI()

export type Display = 'open' | 'close'

interface TodoPropsForUpdate {
  todo: string
  isCompleted: boolean
}
export interface TodoProps extends TodoPropsForUpdate {
  id: number
  userId: number
}

function Main() {
  const [todos, setTodos] = useState<TodoProps[]>([])
  const accessToken = window.localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const getTodosReq = useMutation('getTodos', () => todoAPI.getTodos(accessToken!), {
    onSuccess: (result) => {
      console.log(result)
      setTodos(result)
    },
    onError: (error: AxiosError) => {
      console.log(error)
    },
  })

  useEffect(() => {
    if (accessToken !== '') {
      getTodosReq.mutate()
    } else {
      navigate('/')
    }
  }, [])

  return (
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
        <TodoAddForm getTodosReq={getTodosReq} todoAPI={todoAPI} />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxHeight: '66vh',
            overflowY: 'scroll',
          }}
        >
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {todos.length > 0 &&
              todos.map((todo) => {
                return (
                  <Todo key={todo.id} todo={todo} todoAPI={todoAPI} getTodosReq={getTodosReq} />
                )
              })}
          </List>
        </Box>
      </Box>
    </Container>
  )
}

export default Main
