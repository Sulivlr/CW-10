import NewsForm from './NewsForm';
import {Typography} from '@mui/material';
import {createNews} from './newsThunks';
import {NewsMutation} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectNewsCreating} from './NewsSlice';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectNewsCreating);
  const navigate = useNavigate();


  const onFormSubmit = async (newsMutation: NewsMutation) => {
    await dispatch(createNews(newsMutation));
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>Add new post</Typography>
     <NewsForm isLoading={isCreating} onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewPost;