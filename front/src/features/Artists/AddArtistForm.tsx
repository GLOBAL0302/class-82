import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { IArtistMutation } from '../../types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postArtistFormThunk } from './artistsThunk';
import { useNavigate } from 'react-router-dom';
import { selectArtistPostLoading } from './artistsSlice';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const initialState: IArtistMutation = {
  title: '',
  description: '',
  image: null,
};

const AddArtistForm = () => {
  const [artistForm, setArtistForm] = useState(initialState);
  const postingArtistLoading = useAppSelector(selectArtistPostLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitArtistForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(postArtistFormThunk(artistForm)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setArtistForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onChangeArtistForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setArtistForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Box component="div" className="flex flex-col items-center gap-4">
      <Typography component="h5" variant="h5" className="border border-2 p-2">
        Add Artist
      </Typography>
      <Box component="form" className="w-96 flex flex-col gap-2" onSubmit={onSubmitArtistForm}>
        <TextField
          onChange={onChangeArtistForm}
          id="title"
          name="title"
          variant="filled"
          type="text"
          placeholder="Title"
        />

        <TextField
          onChange={onChangeArtistForm}
          id="description"
          name="description"
          variant="filled"
          type="text"
          placeholder="Description"
        />

        <Button
          color={artistForm.image ? 'success' : 'info'}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={artistForm.image ? <CloudDoneIcon /> : <CloudUploadIcon />}
        >
          {artistForm.image ? artistForm.image?.name : 'Upload Images'}
          <VisuallyHiddenInput type="file" onChange={onChangeFile} name="image" id="image" />
        </Button>

        <Button disabled={postingArtistLoading} loading={postingArtistLoading} type="submit" variant="contained">
          Submit artist
        </Button>
      </Box>
    </Box>
  );
};

export default AddArtistForm;
