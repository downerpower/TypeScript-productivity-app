import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useEffect, useRef, useState } from "react";

interface Props {
   todo: Todo;
   todos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
   const [edit, setEdit] = useState(false);
   const [editTodo, setEditTodo] = useState(todo.todo);

   const handleDelete = (id: number) => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
   }

   const handleDone = (id: number) => {
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
   }

   const handleEdit = (e: React.FormEvent, id: number) => {
      e.preventDefault();

      setTodos(prevTodos => prevTodos.map(todo => (
         todo.id === id ? { ...todo, todo: editTodo } : todo
      )));
      setEdit(false)
   }

   useEffect(() => {
      inputRef.current?.focus();
   }, [edit])

   const inputRef = useRef<HTMLInputElement>(null);

   return (
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
         {
            edit ? (
               <input className="todos__single--text" value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} />

            ) : (
               todo.isDone ? (
                  <s className="todos__single--text">{todo.todo}</s>
               ) : (
                  <span className="todos__single--text">{todo.todo}</span>
               )
            )
         }
         <div>
            <span className="icon" onClick={() => {
               if (!edit && !todo.isDone) {
                  setEdit(!edit);
               }
            }
            }>
               <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
               <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)} >
               <MdDone />
            </span>
         </div>
      </form>
   );
}

export default SingleTodo;