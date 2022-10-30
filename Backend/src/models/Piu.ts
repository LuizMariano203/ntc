import { uuid } from "uuidv4";
interface PiusConstructor{
  userIdp: string;

  text: string;
}
class Piu {
  piuId: string;

  userIdp: string;

  text: string;

  piuCreationDate: Date;

  piuUpdateDate: Date;

  constructor({text, userIdp }:PiusConstructor){
    this.text = text;
    this.piuCreationDate = new Date();
    this.userIdp = userIdp;
    this.piuId = uuid();
    this.piuUpdateDate = new Date();
  }
}

export default Piu;
