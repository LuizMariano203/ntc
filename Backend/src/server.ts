import express, { json } from 'express'
import morgan from 'morgan';

const app = express();

 app.use(morgan('dev'));
 app.use(express.json());

 app.get('/', (request, response)=> {
    return response.json({message:'Hello World'})
});

app.listen(3333, () =>{
    console.log('Server started on por 3333')
});