import express from 'express';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader} from 'mysql2';
import {Commentary, CommentsMutation} from '../types';

const commentariesRouter = express.Router();

commentariesRouter.get('/', async (req, res, next) => {
  try {
    const result = await mysqlDb.getConnection().query(
      'SELECT * FROM commentaries',
    );
    const commentaries = result[0] as Commentary[];
    return res.send(commentaries);
  } catch (e) {
    next(e)
  }
});

commentariesRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    `SELECT * FROM commentaries WHERE id = ?`,
    [id]
  );
  const commentaries = result[0] as Commentary[];
  if (commentaries.length === 0) {
    return res.status(404).send({error: 'Commentary not found'});
  }
  return res.send(commentaries[0]);
});

commentariesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(
    'SELECT * FROM commentaries WHERE id = ?',
    [id]
  );
  const commentaries = result[0] as Commentary[];
  if (!commentaries[0]) {
    return res.status(404).send({error: 'Commentary not found'});
  }
  const deletedResult = await mysqlDb.getConnection().query(
    'DELETE FROM commentaries WHERE id = ?',
    [id]
  );
  return res.send(deletedResult[0]);
});


commentariesRouter.post('/',async (req, res) => {
  if (!req.body.author) {
    return res.status(400).send({error: 'Please enter an author'});
  }

  const commentary: CommentsMutation = {
    news_id: parseInt(req.body.news_id),
    author: req.body.author,
    text: req.body.text,
  };

  const insertResult = await mysqlDb.getConnection().query(
    'INSERT INTO commentaries (news_id, author, text) VALUES (?, ?, ?)',
    [commentary.news_id, commentary.author, commentary.text],
  );

  const resultHeader = insertResult[0] as ResultSetHeader;

  const getNewResult = await mysqlDb.getConnection().query(
    'SELECT * FROM commentaries WHERE id = ?',
    [resultHeader.insertId]
  );

  const commentaries = getNewResult[0] as Commentary[];
  return res.send(commentaries[0]);
});

export default commentariesRouter;

