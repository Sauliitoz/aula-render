import express from "express";
import "dotenv/config";
import itemsPool from "./DBConfig.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/items", async (req, res) => {
  try {
    const { rows: allItems } = await itemsPool.query("SELECT * FROM items");
    res.json({ allItems });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar itens");
  }
});

app.post("/api/items", async (req, res) => {
  const { description } = req.body;

  try {
    const newItem = await itemsPool.query(
      "INSERT INTO items (description) VALUES ($1) RETURNING *",[description]);
      res.json({ message: "Item adicionado com sucesso", item: newItem.rows })
    ;
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar itens");
  }
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
