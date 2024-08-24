import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import ForwardIcon from '@mui/icons-material/Forward';
import imageNotFound from '../../../assets/images/image-not-found.jpg';
import {useAppDispatch} from '../../../app/hooks';
import {fetchNews, removePost} from './newsThunks';

interface Props {
  title: string;
  createdAt: string;
  id: string;
  image: string | null;
  isLoading: boolean;
}

const NewsItem: React.FC<Props> = ({title, id, createdAt,image,isLoading}) => {
  let cardImage = imageNotFound;

  if (image) {
    cardImage = `http://localhost:8000/${image}`;
  }
  const dispatch = useAppDispatch()
  const onRemove = async () => {
    if (window.confirm('Are you sure you want to remove?')) {
      await dispatch(removePost(id))
      await dispatch(fetchNews());
    }
  }

  return (
    <Grid item sx={{width: '300px'}}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <CardMedia image={cardImage} title={title} sx={{height: 0, paddingTop: '56%'}} />
        <CardContent>
          <strong>{createdAt}</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/news/${id}`}>
            <ForwardIcon/>
          </IconButton>
          <Button onClick={onRemove} disabled={isLoading}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NewsItem;