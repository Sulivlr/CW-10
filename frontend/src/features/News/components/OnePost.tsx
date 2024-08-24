import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectOnePost, selectOnePostFetching} from './NewsSlice';
import {fetchOneNews} from './newsThunks';
import {CircularProgress, Grid, Typography} from '@mui/material';

const OnePost = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const isFetching = useAppSelector(selectOnePostFetching);

  useEffect(() => {
    dispatch(fetchOneNews(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      {isFetching && <CircularProgress/>}
      {post && (
        <>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="h4">{post.createdAt}</Typography>
          <Typography variant="body1">{post.content}</Typography>
        </>
      )}
    </Grid>
  );
};

export default OnePost;