import './App.css';
import React, {useState, useEffect} from "react";
// import componens 
import Form from './components/form';
import Todolist from './components/todolist';

function App() {

   // Set states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // run once when the app starts 
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);


  // functions 

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default: 
      setFilteredTodos(todos);
        break;
    }
  };


  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

  const getLocalTodos =() => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);

    }


  };


  return (
    <div className="App">
     <header>
       <h1>
         Claud's ToDo List 🚀
       </h1>
     </header>
     <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      filteredTodos ={filteredTodos}/>
     
     <Todolist 
      todos ={todos} 
      setTodos={setTodos}
      filteredTodos ={filteredTodos} />
    </div>
  );
}

export default App;
