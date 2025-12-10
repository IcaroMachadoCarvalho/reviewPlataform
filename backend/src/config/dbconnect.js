import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente
dotenv.config();

// eslint-disable-next-line no-undef
const MONGO_URL = process.env.MONGO_URL;

const connectDatabase = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));
};

export default connectDatabase;
