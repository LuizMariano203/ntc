import { Router } from "express";
import { uuid } from "uuidv4";
import piusRouter from "./pius.routes";
import usersRouter from "./users.routes";


const routes = Router();
routes.use("/pius", piusRouter );
routes.use("/users", usersRouter );







// routes.use('/piusmsg', piusRouter);
// routes.use('/user', usersRouter);




  


export default routes;
