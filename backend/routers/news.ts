import express from 'express';
import mysqlDb from '../mysqlDb';
import {imagesUpload} from '../multer';
import {ResultSetHeader} from 'mysql2';
import {News, NewsMutation} from '../types';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM news',
  );
  const news = result[0] as News[];
  res.send(news);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    `SELECT * FROM news WHERE id = ?`,
    [id]
  );
  const news = result[0] as News[];
  if (news.length === 0) {
    return res.status(404).send({error: 'News not found'});
  }
  return res.send(news[0]);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM news WHERE id = ?',
    [id]
  );
  const news = result[0] as News[];
  if (!news[0]) {
    return res.status(404).send({ error: 'News not found' });
  }
  const deletedResult = await mysqlDb.getConnection().query(
    'DELETE FROM news WHERE id = ?',
    [id]
  );
  return res.send(deletedResult[0]);
});


router.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({error: 'Please enter a title or content'});
  }

  const post: NewsMutation = {
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.filename : null,
  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO news (title, content, image) VALUES (?, ?, ?)',
    [post.title, post.content, post.image],
  );

  const resultHeader = insertResult[0] as ResultSetHeader;

  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM news WHERE id = ?',
    [resultHeader.insertId]
  );

  const news = getNewResult[0] as News[];
  return res.send(news[0]);
});

export default router;

