import { uuid } from "uuidv4";

class User {
  userId: string;
  name: string;
  email: string;
  birthday: string;
  cpf: string;
  number: string;
  creationDate: Date;
  updateDate: Date;
  constructor(
    
    name: string,
    email: string,
    birthday: string,
    cpf: string,
    number: string,
    
  ) {
    this.userId = uuid();
    this.birthday = birthday;
    this.cpf = cpf;
    this.creationDate = new Date();
    this.updateDate = new Date();
    this.number = number;
    this.name = name;
    this.email = email;
  }
}

export default User;
