import { response, Router } from "express";

import PiusRepository from "../repositories/PiusRepository";
import CreatePiuService from "../services/CreatePiuService";
const piusRouter = Router();

const piusRepository = new PiusRepository();
const pius = piusRepository.list();

piusRouter.post("/", (req, res) => {
  try {
    const { userIdp, text } = req.body;

    const createPiu = new CreatePiuService(piusRepository);
    const piu = createPiu.execute({ text, userIdp });
    return res.json(piu);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
});

piusRouter.get("/", (req, res) => {
  return res.json(pius);
});

piusRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const piu = pius.find((piu) => piu.piuId === id);

  if (!piu) return res.status(404).json({ message: "Piu not found" });

  res.json(piu);
});

piusRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = pius.findIndex((piu) => piu.piuId === id);
  const { text } = req.body;

  if (text === "")
    return res.status(400).json({ message: "Text area is empty" });

  if (text.length > 140)
    return res
      .status(400)
      .json({ message: "Text has 140 more than characters" });

  pius[index].text = text;

  pius[index].piuUpdateDate = new Date();
  return res.json(pius[index]);
});

piusRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = pius.findIndex((piu) => piu.piuId === id);
  pius.splice(index, 1);

  return res.json(pius[index]);
});

export default piusRouter;
