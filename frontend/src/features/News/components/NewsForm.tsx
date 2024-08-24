import React, {ChangeEvent, useState} from 'react';
import {Grid, TextField} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {NewsMutation} from '../../../types';
import SaveIcon from '@mui/icons-material/SaveAs';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (news: NewsMutation) => void;
  isLoading: boolean;
}

const NewsForm: React.FC<Props> = ({onSubmit, isLoading}) => {

  const [state, setState] = useState<NewsMutation>({
    title: '',
    content: '',
    image: null,
    createdAt: '',
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...state});
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          name="title"
          id="title"
          label="Title"
          value={state.title}
          required
          onChange={inputChangeHandler}
        />

      </Grid>
      <Grid item>
        <TextField
          id="content"
          name="content"
          multiline
          label="Content"
          required
          rows={4}
          value={state.content}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput
          label="Image"
          title="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
        >Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default NewsForm;