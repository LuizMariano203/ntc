import User from "../models/User";

interface CreateuserDTO{ 
    name: string,
    email: string,
    birthday: string,
    cpf: string,
    number: string,
    }
class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public list(): User[] {
    return this.users;
  }
  public create({birthday,cpf,email,name,number}:CreateuserDTO) {
        const user = new User(name, email, birthday, cpf, number);
    this.users.push(user);
    return user;
  }
}

export default UsersRepository;