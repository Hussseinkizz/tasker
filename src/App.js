import './styles/css/App.min.css'
import { useState, useEffect } from 'react'
import { FaMinusSquare} from 'react-icons/fa'
import Topping from './components/Topping'

const api = 'http://localhost:5000/tasks'; // our backend api

export default function App() {
  const [todos, setTodos] = useState([])

// FETCH DATA FROM THE SERVER & SET IT TO STATE
  useEffect(() => {
   const getTasks = async () => {
     const tasksFromServer = await fetchTasks()
     setTodos(tasksFromServer)
   }

     getTasks()
  }, [])

 const fetchTasks = async () => {
      const res = await fetch(api)
      const data = await res.json()

      return data
    }
    
// TOGGLE CHECKBOX
  const handleChange = id => {
    setTodos(todos.map(todo => {
        if(todo.id === id) {
           todo.completed = !todo.completed
        } return todo
    }))
}

// HANDLE FORM SUBMISSION, ADD A TODO...
  // const addTodo = (todo) => {
  //   const key = Math.floor(Math.random() * 1000) + 1
  //   const newTodo = {key,...todo}
  //   setTodos([...todos,newTodo])
  // }

// SEND A REQ TO CREATE A NEW OBJECT IN DB,  AND RETURN IT BACK UPDATING STATE
const addTodo = async (todo) => {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body : JSON.stringify(todo)
  })

  const data = await res.json()
  setTodos([...todos,data])
}

// DELETE A TODO
// const handleDelete = id => {
//   setTodos(todos.filter(todo => todo.id !== id))
// }

// SEND A REQ TO DELETE GIVEN IDENTIFIED TASK
 const handleDelete = async (id) => {
   await fetch(`${api}/${id}`,
    {
      method: 'DELETE',
    })
  setTodos(todos.filter(todo => todo.id !== id))
 }


// MAKE TODOS A LIST
const listItems = 
todos.map(item => 
  <div className="TodoItem">
  <div>
  <input type="checkbox" checked={item.completed}
    onChange={() => handleChange(item.id)}
  />
  <span 
  className="TodoText" 
  style={item.completed ? {color: '#9CA3AF',textDecoration: 'line-through'} : null}>
    {item.text}
  </span>
  </div>
  
  <div>
  <FaMinusSquare className="DeleteIcon" onClick={() => handleDelete(item.id)}/>
  </div>
</div>)

// GIVE FEEDBACK FOR EMPTY TASKS
const feedBack = <h4 style={{textAlign:'center'}}>well done, no todos!</h4>

// BELOW WE RENDER OUR STUFF TO THE END USER!
  return (
    <>
      <div className='App'>
        <div className='TodoWrapper'>
            <div className='Topping'>
            <Topping 
              setInputs = {addTodo}
            />
            </div>
            <div className='BottomPane'>
            {todos.length > 0 ? listItems : feedBack}
            </div>
         </div>
      </div>
    </>
  )
}
