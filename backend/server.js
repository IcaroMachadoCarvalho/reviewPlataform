import app from "./src/app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// {
//   "_id": ObjectId("5f8d0d55b54764421b5e3a4b"),
//   "user_id": ObjectId("5f8d0d55b54764421b5e3a4a"),
//   "course_event_product_id": ObjectId("1001"),  // ID do curso, evento ou produto
//   "type": "course",  // Tipo (course, event, product)
//   "rating": 4,  // Nota de avaliação (1 a 5)
//   "review_text": "Ótimo curso, aprendi bastante!",  // Comentário opcional
//   "created_at": ISODate("2025-12-01T10:00:00Z"),
//   "updated_at": ISODate("2025-12-01T10:00:00Z")
// }
