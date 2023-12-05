import { useEffect, useState } from 'react'
import axios from 'axios'
import AddItemForm from './AddItemForm'
import { Button } from 'react-bootstrap'

function TodoList() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      await axios.get('http://localhost:2001/api/items').then((data) => setData(data.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  const onTaskCreate = async (newTask) => {
    await axios.post('http://localhost:2001/api/items', {
      task: newTask
    })
    fetchData()
  }

  const onDelete = async (id) => {
    if (id) {
      console.log(id)
      await axios.delete(`http://localhost:2001/api/items/${id}`)
      fetchData()
    } else {
      console.log('id is undefined')
    }
  }

  const handleEdit = async (id) => {
    await axios.put(`http://localhost:2001/api/items/${id}`, {
      completed: true
    })
    fetchData()
  }

  return (
    <>
      <div className="mt-5 ">
        <AddItemForm onTaskCreate={onTaskCreate} />
        <div className="bar border p-3">
          <ul className="list-unstyled">
            {data.map((task, index) => (
              <li key={index} className="mt-2">
                <div className="task_bar rounded text-center align-items-center d-flex justify-content-between">
                  <p
                    className={task.completed ? 'line_through' : ''}
                    onClick={() => handleEdit(task._id)}
                  >
                    {task.task}
                  </p>
                  <Button
                    className="mr-2"
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TodoList
