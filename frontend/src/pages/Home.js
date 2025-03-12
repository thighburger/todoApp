import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import { fetchTodos, addTodo as apiAddTodo, deleteTodo as apiDeleteTodo } from "../api/TodoApi";
import "./Home.css";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const newTodo = await apiAddTodo(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Todo 추가 실패:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apiDeleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Todo 삭제 실패:", error);
    }
  };

  return (
    <div className="Home">
      <h1>Todo 리스트</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Home;
