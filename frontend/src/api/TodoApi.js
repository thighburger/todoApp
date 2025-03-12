const API_URL = "http://localhost:5000/api/todos";

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("서버 응답 오류");
  return response.json();
};

export const addTodo = async (text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) throw new Error("Todo 추가 실패");
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Todo 삭제 실패");
};
