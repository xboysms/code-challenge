import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Dummy data (in-memory database)
interface Item {
  id: number;
  name: string;
  description: string;
}

let items: Item[] = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
];

// Routes

// 📌 GET all items
app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// 📌 GET a single item by ID
app.get("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// 📌 POST Create a new item
app.post("/items", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newItem: Item = {
    id: items.length + 1,
    name,
    description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 📌 PUT Update an item by ID
app.put("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) res.status(404).json({ message: "Item not found" });

  items[itemIndex] = { id, name, description };
  res.json(items[itemIndex]);
});

// 📌 DELETE Remove an item by ID
app.delete("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.json({ message: "Item deleted successfully" });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
