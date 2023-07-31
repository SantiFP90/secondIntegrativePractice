import express from "express";
import cors from "cors";
import displayRoutes from "express-routemap";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import exphbs from "express-handlebars";
import path from "path";

import PlayersRoutes from "./routes/players.routes.js";
import UsersRoutes from "./routes/users.routes.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils/utils.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const mongoDBURL =
  "mongodb+srv://SantiFP90:tupac123@santifp90.vuaufnp.mongodb.net/ecommerceTwo?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static(`${__dirname}/public`));
initializePassport();
app.use(passport.initialize());

// Configurar Handlebars como el motor de plantillas
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const handlebars = exphbs.create({
  allowProtoProperties: true,
  allowProtoMethods: true,
  allowProtoPropertiesByDefault: true,
});

app.engine("handlebars", handlebars.engine);
app.set("views", path.join(currentDir, "views"));
app.set("view engine", "handlebars");

app.use("/api/alive", (req, res) => {
  res.json({ ok: true, message: "API ALIVE AND RUNING" });
});

app.get("/", async (req, res) => {
  res.render("login");
});

app.use("/api/players", PlayersRoutes);
app.use("/api/session", UsersRoutes);

app.use("/", viewsRouter);

app.listen(PORT, () => {
  console.log(`***** EXPRESS, ${PORT} ******`);
});
