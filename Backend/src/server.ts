import express, { json } from "express";
import morgan from "morgan";
import routes from "../routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(routes);



app.listen(3333, () => {
  console.log("Server started on por 3333");
});
