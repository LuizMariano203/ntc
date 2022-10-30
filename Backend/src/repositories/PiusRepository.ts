import Piu from "../models/Piu";

interface CreatePiuDTO{ 
    text: string,
     userIdp: string,
    }

class PiusRepository {
  private pius: Piu[];

  constructor() {
    this.pius = [];
  }

  public list(): Piu[] {
    return this.pius;
  }
  
  public create({text,userIdp}:CreatePiuDTO) {
    const piu = new Piu( {text,userIdp} );
    this.pius.push(piu);
    return piu;
  }
}

export default PiusRepository;
