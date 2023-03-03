import { useRef } from 'react';
import './styles.css';

interface Props {
   todo: string;
   setTodo: React.Dispatch<React.SetStateAction<string>>;
   addTodoHandler: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, addTodoHandler }: Props) => {
   const inputRef = useRef<HTMLInputElement>(null);

   return (
      <form className="input" onSubmit={(e) => {
         addTodoHandler(e)
         inputRef.current?.blur();
      }}>
         <input
            className="input__box"
            type='text'
            value={todo}
            ref={inputRef}
            placeholder="Enter a task"
            onChange={(e) => setTodo(e.target.value)}
         />
         <button className="input_submit" type='submit'>Go</button>
      </form>
   );
}

export default InputField; 