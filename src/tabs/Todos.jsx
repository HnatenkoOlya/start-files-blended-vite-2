import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Text from '../components/Text/Text';
import Form from '../components/Form/Form'
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';


const Todos = () => {
  //const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("change-todos");
    return savedTodos ? JSON.parse(savedTodos) : []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const onEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };
  
  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };
  
  const updateTodo = (newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === currentTodo.id ? { ...todo, text: newText } : todo
      )
    );
    setIsEditing(false);
    setCurrentTodo(null);
  };

  useEffect(() => {
    localStorage.setItem("change-todos", JSON.stringify(todos));
  }, [todos]); 
  const addTodos = (todoData) => {
    const newTodo = {
      id: nanoid(),
      text: todoData.text,
    }
    setTodos(prevtTodos => {
      return [...prevtTodos, newTodo];
    })
  }

  const deleteTodo = (todoId) => {
    setTodos(prevtTodos => {
      return prevtTodos.filter((todo) => todo.id !== todoId);
    })
  };
    const addNewTodo = inputValue => {
      console.log(inputValue); // має вивести значення інпуту під час сабміту форми
    };
    
    //const todos = [
     // { id: '1', text: 'Practice more' },
     // { id: '2', text: 'Get all tasks done on time' },];
    
  return (
    <>
      <Text textAlign="center">There are no any todos ...</Text>
      {isEditing ? (
     <EditForm
      defaultValue={currentTodo.text} updateTodo={updateTodo} cancelUpdate={cancelUpdate}/> ) 
      : (<Form onSubmit={addNewTodo} onAdd={addTodos} />)}
      
      <TodoList todos={todos} onDelete = {deleteTodo} onEdit={onEdit}/>
    </>
  );
};

export default Todos;
