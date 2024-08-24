import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  title: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, label, title}) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement| null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onChange(e);
  };


  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        name={title}
        onChange={onFileChange}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            label={label}
            InputProps={{readOnly: true}}
            value={fileName}
            onClick={activateInput}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;