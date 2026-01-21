import app from "./src/app.js";
import connectDatabase from "./src/config/dbconnect.js";

const port = 3000;
await connectDatabase();

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
