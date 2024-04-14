// Using the useState (change state) and useEffect (functions with render components)
import React, {
  useState, useEffect
} from 'react'
// Stylizing to the Add ToDo
import {AiOutlinePlus} from 'react-icons/ai'
// Importing the jsx which contains each ToDo values
import Todo from './Todo.jsx'
// Importing the db of the firebase (nosql used in this application)
import {db} from './firebase'
// Importing the firebase functions like collection (create db), onSnapshot (execute query / listen doc), query (consulting), addDoc (create document), updateDoc (change something in the document), deleteDoc (remove document) and doc (get document)
import {
collection, 
onSnapshot, 
query, 
addDoc,
updateDoc,
deleteDoc,
doc 
} 
from 'firebase/firestore'

// Using tailwind css
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-2 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
}

// Function default
function App() {

  // Using the necessary hooks

  // tasks
  const [todos, setTodos] = useState([])
  // input for putting the task
  const [input, setInput] = useState('')

  // Create Todo

  const createTodo = async (e) => {
    // Prevent the submit
    e.preventDefault(e)
    // Check if the input is empty
    if (input === ''){
      alert("Please enter a valid todo")
      return
      // Pause the function
    }
    // Add the todo to the firebase
    await addDoc
    // finding or creating todo's db
    (collection(db, 'todos'), {
      // Taking the input and setting it to the text
      text: input,
      // Setting the completed to false, because is a task that you just put in the moment
      completed: false
    })
    // Emptying the input
    setInput('')
  }

  // Read Todo in firebase

  // Function to be used after render components
  useEffect(()=>{
    // Query to get the "todos collection"
    const q = query(collection(db, 'todos'))
    // Snapshot to get the data from the query
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      // Creating an array to store the data
      let todosArr = []
      // Looping through the data
      querySnapshot.forEach((doc)=>{
        // Pushing the data to the array
        todosArr.push({...doc.data(), id: doc.id})
      })
      // Setting the todos to the array
      setTodos(todosArr)
    })
    // Cleanup function
    return ()=> unsubscribe()
  }, [])

  // Update Todo in firebase

  // Function to update the todo
  const toggleComplete = async(todo) => {
    await updateDoc(
      // Query to get the todo
      doc(db, 'todos', todo.id), {
      // Setting the completed to the opposite of the current value (true turns false, false turns true)
      completed: !todo.completed
    })
  } 

  // Delete Todo

  // Function to delete the todo
  const deleteTodo = async(id)=> {
    await deleteDoc
    // Query to get the todo
    (doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
          <h3 className={style.heading}>TODO APP</h3>
          <form onSubmit={createTodo} className={style.form}>            
            <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add Todo'/>
            <button className={style.button}><AiOutlinePlus size={30}/></button>
          </form>
          <ul>
            {todos.map((todo, index)=>(
                <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            ))}
          </ul>

          {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todo`}{todos.length === 1 ? '' : 's'}</p>}
      </div>
    </div>
  );
}

export default App;
