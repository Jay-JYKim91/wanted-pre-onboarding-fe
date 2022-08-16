import React, { useState } from 'react'
import { Box, Input, Button } from '@mui/material'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import TodoAPI from '../services/todoAPI'

type Props = {
  getTodosReq: any
  todoAPI: TodoAPI
}

function TodoAddForm({ getTodosReq, todoAPI }: Props) {
  const [todoInput, setTodoInput] = useState('')
  const accessToken = window.localStorage.getItem('accessToken')

  const createTodoReq = useMutation(
    'createTodo',
    (todo: string) => todoAPI.createTodo(todo, accessToken!),
    {
      onSuccess: () => {
        setTodoInput('')
        getTodosReq.mutate()
      },
      onError: (error: AxiosError) => {
        console.log(error)
      },
    },
  )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (todoInput !== '') {
      createTodoReq.mutate(todoInput)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Input
        placeholder='Add a new Todo'
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        sx={{ padding: '4px', marginRight: '12px', width: '100%' }}
      />
      <Button type='submit' variant='contained' sx={{ fontWeight: 'bold' }}>
        ADD
      </Button>
    </Box>
  )
}

export default TodoAddForm
