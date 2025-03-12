import { useState } from "react";

function TodoInput({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="새 Todo를 입력하세요"
      />
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}

export default TodoInput;
