import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  DB_MONGO: process.env.DB_MONGO,
};
