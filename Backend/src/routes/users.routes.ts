import { Router } from "express";
import { uuid } from "uuidv4";
import User from "../models/User";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";
const usersRouter = Router();

const usersRepository = new UsersRepository();
  export const users = usersRepository.list();

usersRouter.post("/", (req, res) => {
 try{ const { name, email, birthday, cpf, number } = req.body;

  
 const createUser = new CreateUserService(usersRepository);
 const user = createUser.execute({ birthday,cpf,email,name,number });

 
 return res.json(user);
}catch(err){ return res.status(400).json({ error: (err as Error).message });

}
});

usersRouter.get("/", (req, res) => {
  return res.json(users);
});

usersRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.userId === id);
  const { name, email, birthday, cpf, number } = req.body;
  if (name === "")
    return res.status(400).json({ message: "Name area is empty" });

  if (birthday === "")
    return res.status(400).json({ message: "Birthday area is empty" });

  if (cpf === "") return res.status(400).json({ message: "CPF area is empty" });

  if (number === "")
    return res.status(400).json({ message: "Number area is empty" });

  if (email === "")
    return res.status(400).json({ message: "Email area is empty" });

  if (users.find((user) => user.cpf === cpf && user.userId !== id))
    return res
      .status(400)
      .json({ message: "User with this cpf already exists" });

  users[index].name = name;
  users[index].email = email;
  users[index].birthday = birthday;
  users[index].cpf = cpf;
  users[index].updateDate = new Date();
  return res.json(users);
});

usersRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.userId === id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});
usersRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.userId === id);
  users.splice(index, 1);

  return res.json(users[index]);
});

export default usersRouter;
