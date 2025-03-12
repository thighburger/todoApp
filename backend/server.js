const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// MongoDB 연결
mongoose.connect("mongodb://localhost:27017/todoDB")
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// Todo 모델 정의
const Todo = mongoose.model("Todo", new mongoose.Schema({
  text: { type: String, required: true },
}));

// CORS 설정
app.use(cors());
app.use(express.json());

// GET: Todo 목록 가져오기
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "서버 에러" });
  }
});

// POST: 새로운 Todo 추가하기.
app.post("/api/todos", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Todo 텍스트를 입력하세요." });
  }

  try {
    const newTodo = new Todo({
      text,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "서버 에러" });
  }
});

// DELETE: Todo 삭제하기
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo 삭제 완료!" });
  } catch (err) {
    res.status(500).json({ message: "서버 에러" });
  }
});

// 서버 시작!
app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
