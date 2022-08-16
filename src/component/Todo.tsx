import React, { useState } from 'react'
import { TodoProps, Display } from '../page/Main'
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import TodoAPI from '../services/todoAPI'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'

type Props = {
  todo: TodoProps
  todoAPI: TodoAPI
  getTodosReq: any
}

function Todo({ todo, todoAPI, getTodosReq }: Props) {
  const [editTodoInput, setEditTodoInput] = useState('')
  const accessToken = window.localStorage.getItem('accessToken')

  function handleDisplayBtns(todo: TodoProps, type: Display) {
    const defaultModeBtns = document.getElementById(`defaultModeBtns-${todo.id}`)
    const editModeBtns = document.getElementById(`editModeBtns-${todo.id}`)
    const todoTitle = document.getElementById(`todoTitle-${todo.id}`)
    const todoInput = document.getElementById(`todoInput-${todo.id}`)!.parentElement!.parentElement
    const allDefaultBtns = Array.from(document.getElementsByClassName('defaultModeBtns'))
    const allEditBtns = Array.from(document.getElementsByClassName('editModeBtns'))
    const allInput = Array.from(document.getElementsByClassName('MuiTextField-root'))
    const allTitle = Array.from(document.getElementsByClassName('todoTitle'))

    function resetDisplay() {
      allDefaultBtns.forEach((el) => {
        ;(el as HTMLElement).style.display = 'block'
      })
      allEditBtns.forEach((el) => {
        ;(el as HTMLElement).style.display = 'none'
      })
      allInput.forEach((el) => {
        ;(el as HTMLElement).style.display = 'none'
      })
      allTitle.forEach((el) => {
        ;(el as HTMLElement).style.display = 'block'
      })
    }

    if (type === 'open') {
      resetDisplay()
      defaultModeBtns!.style.display = 'none'
      editModeBtns!.style.display = 'block'
      setEditTodoInput(todo.todo)
      todoTitle!.style.display = 'none'
      todoInput!.style.display = 'block'
    } else {
      defaultModeBtns!.style.display = 'block'
      editModeBtns!.style.display = 'none'
      todoTitle!.style.display = 'block'
      todoInput!.style.display = 'none'
    }
  }

  const updateTodoReq = useMutation(
    'updateTodo',
    (data: TodoProps) =>
      todoAPI.updateTodo({ todo: data.todo, isCompleted: data.isCompleted }, accessToken!, data.id),
    {
      onError: (error: AxiosError) => {
        console.log(error)
      },
    },
  )

  const deleteTodoReq = useMutation(
    'deleteTodo',
    (id: number) => todoAPI.deleteTodo(id, accessToken!),
    {
      onSuccess: () => {
        getTodosReq.mutate()
      },
      onError: (error: AxiosError) => {
        console.log(error)
      },
    },
  )

  function handleCheckboxClicked(todo: TodoProps) {
    const data = { ...todo, isCompleted: !todo.isCompleted }
    updateTodoReq.mutate(data, {
      onSuccess: () => {
        getTodosReq.mutate()
      },
    })
  }

  function handleEditTodo(todo: TodoProps) {
    const data = { ...todo, todo: editTodoInput }
    updateTodoReq.mutate(data, {
      onSuccess: () => {
        getTodosReq.mutate()
        handleDisplayBtns(todo, 'close')
      },
    })
  }

  function handleDeleteClicked(id: number) {
    const confirm = window.confirm('Are you sure you want to delete this todo?')

    if (confirm) {
      deleteTodoReq.mutate(id)
    }
  }

  return (
    <ListItem
      secondaryAction={
        <Box>
          <Box id={`defaultModeBtns-${todo.id}`} className='defaultModeBtns'>
            <IconButton
              edge='end'
              aria-label='edit'
              sx={{ marginRight: '4px' }}
              onClick={() => handleDisplayBtns(todo, 'open')}
            >
              <EditIcon />
            </IconButton>
            <IconButton edge='end' aria-label='delete' onClick={() => handleDeleteClicked(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box id={`editModeBtns-${todo.id}`} className='editModeBtns' sx={{ display: 'none' }}>
            <IconButton
              edge='end'
              aria-label='editX'
              sx={{ marginRight: '4px' }}
              onClick={() => handleDisplayBtns(todo, 'close')}
            >
              <EditOffIcon />
            </IconButton>
            <IconButton edge='end' aria-label='edit' onClick={() => handleEditTodo(todo)}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      }
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <Checkbox
          edge='start'
          onClick={() => handleCheckboxClicked(todo)}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText id={`todoTitle-${todo.id}`} className='todoTitle' primary={`${todo.todo}`} />
      <TextField
        sx={{
          '&.MuiTextField-root': {
            display: 'none',
          },
        }}
        inputProps={{
          style: {
            padding: '8px',
          },
        }}
        id={`todoInput-${todo.id}`}
        variant='outlined'
        value={editTodoInput}
        onChange={(e) => setEditTodoInput(e.target.value)}
      />
    </ListItem>
  )
}

export default Todo
