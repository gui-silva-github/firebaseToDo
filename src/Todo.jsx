import React from 'react'
// Stylizing to the Delete ToDo
import {FaRegTrashAlt} from 'react-icons/fa'

// Using tailwind css
const style = {
    li: `flex justify-between p-4 my-2`,
    liComplete: `flex justify-between p-4 my-2`,
    row: `flex`,
    text: `ml-2`,
    textComplete: `ml-2`,
    button: `cursor-pointer flex items-center`,
  };

// Function default
const Todo = ({todo, toggleComplete, deleteTodo})=>{

    return (

        <li className={todo.completed ? style.liComplete : style.li}>

            <div className={style.row}>

                <input onChange={()=> toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
                <p onClick={()=> toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>

            </div>

            <button onClick={()=> deleteTodo(todo.id)}>{<FaRegTrashAlt/>}</button>  

        </li>

    )

}

export default Todo