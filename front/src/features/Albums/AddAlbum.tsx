import { Box, Button, Checkbox, MenuItem, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { VisuallyHiddenInput } from '../Artists/AddArtistForm';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { IAlbumMutation } from '../../types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { selectArtists } from '../Artists/artistsSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { postAlbumtFormThunk } from './albumThunk';

const initialState: IAlbumMutation = {
  title: '',
  artist: '',
  image: null,
  isPublished: '',
  create_at: '',
};

const AddAlbum = () => {
  const [albumForm, setAlbumForm] = useState(initialState);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  const onSubmitArtistForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(postAlbumtFormThunk(albumForm)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setAlbumForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const handleIsPublished = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumForm((prevState) => ({
      ...prevState,
      isPublished: event.target.checked ? 'true' : 'false',
    }));
  };

  const onChangeArtistForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAlbumForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setAlbumForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDate = (value: Dayjs | null) => {
    setAlbumForm((prevState) => ({
      ...prevState,
      create_at: value ? value.toDate().toISOString() : '',
    }));
  };

  return (
    <Box component="div" className="flex flex-col items-center gap-4">
      <Typography component="h5" variant="h5" className="border border-2 p-2">
        Add Album
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
          color={albumForm.image ? 'success' : 'info'}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={albumForm.image ? <CloudDoneIcon /> : <CloudUploadIcon />}
        >
          {albumForm.image ? albumForm.image?.name : 'Upload Images'}
          <VisuallyHiddenInput type="file" onChange={onChangeFile} name="image" id="image" />
        </Button>
        <Select
          labelId="artist"
          id="artist"
          name="artist"
          value={albumForm.artist}
          label="artist"
          onChange={handleSelectChange}
        >
          <MenuItem value="" disabled>
            Select Artist
          </MenuItem>
          {artists.map(
            (item) => item != 'all' && <MenuItem value={item._id}>{item.title.toLocaleUpperCase()}</MenuItem>,
          )}
        </Select>
        <Box component="div" className="flex items-center">
          <Checkbox defaultChecked color="success" id="isPublished" name="isPublished" onChange={handleIsPublished} />
          <Typography component="span">Published</Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={handleDate}
            slotProps={{
              openPickerIcon: {
                color: 'primary',
              },
            }}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained">
          Submit album
        </Button>
      </Box>
    </Box>
  );
};

export default AddAlbum;
