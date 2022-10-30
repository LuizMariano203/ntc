import { Router } from "express";
import { uuid } from "uuidv4";
import piusRouter from "./pius.routes";
import usersRouter from "./users.routes";


routes.use("/pius", piusRouter );
routes.use("/users", usersRouter );

interface User {
  userId: string;
  name: string;
  email: string;
  birthday: string;
  cpf: string;
  number: string;
  creationDate: Date;
  updateDate: Date;
}
const users = [] as User[];

interface Piu {
  piuID: string;
  userIdp: string;
  text: string;
  piuCreationDate: Date;
  piuUpdateDate: Date;
}

const pius = [] as Piu[];

const routes = Router();
// routes.use('/piusmsg', piusRouter);
// routes.use('/user', usersRouter);

routes.post("/pius", (req, res) => {
  const { piuID, userIdp, text, piuCreationDate, piuUpdateDate } = req.body;

  const piu = {
    piuID: uuid(),
    userIdp,
    text,
    piuCreationDate: new Date(),
    piuUpdateDate:new Date(),
  } as Piu;
  if (text === "")
    return res.status(400).json({ message: "Text area is empty" });


    if ( text.length > 140)
    return res.status(400).json({ message: "Text has 140 more than characters" });

    if (!users.find((user) => user.userId == userIdp))
    return res
      .status(400)
      .json({ message: "User with this id does not exist" });

  routes.get("/pius", (req, res) => {
    return res.json(pius);
  });


  pius.push(piu);
  return res.json(piu);
});

routes.get("/pius/:id", (req, res) => {
    const { id } = req.params;
    
  
    const piu = pius.find((piu) => piu.piuID === id);
  
    if (!piu) return res.status(404).json({ message: "Piu not found" });
  
    res.json(piu);
  });




routes.put("/pius/:id", (req, res) => {
    const { id } = req.params;
    const index = pius.findIndex(piu => piu.piuID === id);
    const {  text } = req.body;

    if (text === "")
    return res.status(400).json({ message: "Text area is empty" });


    if ( text.length > 140)
    return res.status(400).json({ message: "Text has 140 more than characters" });
      

    pius[index].text = text;
   
    pius[index].piuUpdateDate = new Date();
    return res.json(users);
  })



  routes.delete("/pius/:id", (req, res) => {
    const { id } = req.params;
    const index = pius.findIndex(piu => piu.piuID === id);
    pius.splice(index, 1);

    return res.json(pius[index]);
  })


  routes.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.userId === id);
    users.splice(index, 1);

    return res.json(users[index]);
    
  })
routes.post("/users", (request, response) => {
  const { name, email, birthday, cpf, number, creationDate, updateDate } =
    request.body;

  const user = {
    userId: uuid(),
    name,
    email,
    birthday,
    cpf,
    number,
    creationDate:new Date(),
    updateDate:new Date(),
  } as User;
  if (name === "")
    return response.status(400).json({ message: "Name area is empty" });

  if (birthday === "")
    return response.status(400).json({ message: "Birthday area is empty" });

  if (cpf === "")
    return response.status(400).json({ message: "CPF area is empty" });

  if (number === "")
    return response.status(400).json({ message: "Number area is empty" });

  if (email === "")
    return response.status(400).json({ message: "Email area is empty" });

  if (users.find((user) => user.cpf === cpf))
    return response
      .status(400)
      .json({ message: "User with this cpf already exists" });

  users.push(user);
  return response.json(user);

});



routes.get("/users", (request, response) => {
  return response.json(users);
});


routes.put("/users/:id", (request, response) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.userId === id);
    const { name, email, birthday, cpf, number,  } =
    request.body;
    if (name === "")
    return response.status(400).json({ message: "Name area is empty" });

  if (birthday === "")
    return response.status(400).json({ message: "Birthday area is empty" });

  if (cpf === "")
    return response.status(400).json({ message: "CPF area is empty" });

  if (number === "")
    return response.status(400).json({ message: "Number area is empty" });

  if (email === "")
    return response.status(400).json({ message: "Email area is empty" });

  if (users.find((user) => user.cpf === cpf && user.userId !== id))
    return response
      .status(400)
      .json({ message: "User with this cpf already exists" });

    users[index].name = name;
    users[index].email = email;
    users[index].birthday = birthday;
    users[index].cpf = cpf;
    users[index].updateDate = new Date();
    return response.json(users);
  })



routes.get("/users/:id", (request, response) => {
  const { id } = request.params;

  const user = users.find((user) => user.userId === id);

  if (!user) return response.status(404).json({ message: "User not found" });

  response.json(user);
});

export default routes;
