import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import newsRouter from './routers/news';
import commentariesRouter from './routers/comentaries';


const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/commentaries', commentariesRouter);

const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log('Listening on port', port);
  })
};

void run();
