import { useState } from 'react'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'

// eslint-disable-next-line
function AddItemForm({ onTaskCreate }) {
  const [newTask, setNewTask] = useState('')

  const onCreate = (e) => {
    e.preventDefault()
    onTaskCreate(newTask)
    setNewTask('')
  }

  return (
    <>
      <Form onSubmit={onCreate} className="mb-5">
        <InputGroup>
          <FormControl
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Enter new task..."
            value={newTask}
          ></FormControl>
          <Button type="submit" variant="primary" disabled={!newTask.length}>
            ADD
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}

export default AddItemForm
