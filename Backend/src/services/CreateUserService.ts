import User from "../models/User";
import usersRouter from "../routes/users.routes";
import UsersRepository from "../repositories/UsersRepository";
import { users } from "../routes/users.routes";

interface Request{ 
    name: string,
    email: string,
    birthday: string,
    cpf: string,
    number: string,
    };

class CreateUserService {
private usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository){
       this.usersRepository = usersRepository; 
    }
    
  public execute({ birthday,cpf,email,name,number}: Request): User {

    if (name === "")
    throw Error('Name area is empty');
    

  if (birthday === "")
  throw Error('Birthday area is empty');

  if (cpf === "") 
  throw Error('CPF area is empty');

  if (number === "")
  throw Error('Number area is empty');

  if (email === "")
  throw Error('Email area is empty');
   

  if (users.find((user) => user.cpf === cpf))
  throw Error('User with this cpf already exists');


    
    const user = this.usersRepository.create({ birthday,cpf,email,name,number });
    return user;
  }
}

export default CreateUserService;
