function TodoItem({ todo, deleteTodo }) {
    return (
      <li>
        {todo.text} <button onClick={() => deleteTodo(todo._id)}>삭제</button>
      </li>
    );
  }
  
  export default TodoItem;
  