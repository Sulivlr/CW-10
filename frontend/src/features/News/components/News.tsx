import {Button, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectNews, selectRemovePost} from './NewsSlice';
import NewsItem from './NewsItem';
import {useEffect} from 'react';
import {fetchNews} from './newsThunks';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const mutatingId = useAppSelector(selectRemovePost);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Posts</Typography>
        </Grid>
          <Grid item>
            <Button color="primary" component={Link} to="/news/new">
              Add new post
            </Button>
          </Grid>
      </Grid>
      <Grid item container spacing={1}>
        {news.map((post) => (
          <NewsItem
            key={post.id}
            id={post.id}
            title={post.title}
            createdAt={post.createdAt}
            image={post.image}
            isLoading={post.id === mutatingId}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default News;