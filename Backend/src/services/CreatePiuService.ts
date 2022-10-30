import Piu from "../models/Piu";
import piusRouter from "../routes/pius.routes";
import PiusRepository from "../repositories/PiusRepository";
import { users } from "../routes/users.routes";

interface Request {
  text: string;
  userIdp: string;
};
class CreatePiuService {
private piusRepository: PiusRepository;
    constructor(piusRepository: PiusRepository){
       this.piusRepository = piusRepository; 
    }
    
  public execute({ text, userIdp }: Request): Piu {

    if (text === "") 
    throw Error('Text area is empty');

    if (text.length > 140)
    throw Error('Text has 140 more than characters');

    if (!users.find((user) => user.userId == userIdp))
      throw Error('User with this id does not exist');

    const piu = this.piusRepository.create({ text, userIdp });
    return piu;
  }
}

export default CreatePiuService;
