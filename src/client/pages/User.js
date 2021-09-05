import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { actionSubmitMessage } from '../redux/actions.js';


export const User = () => {
  const dispatch = useDispatch();
  const [messageTextFieldValue, setMessageTextFieldValue] = useState('');

  const handleMessageTextFieldOnChange = (event) => {
    setMessageTextFieldValue(event.target.value);
  };


  const onClickSubmitButton = () => {
    dispatch(actionSubmitMessage({message:messageTextFieldValue}));
  };

  return (<>
    <Box my={1}>
      <TextField
        id="standard-basic"
        fullWidth={true}
        label="消息"
        value={messageTextFieldValue}
        variant="outlined"
        onChange={handleMessageTextFieldOnChange}
      />
    </Box>
    <Button
      variant="contained"
      fullWidth={true}
      color="primary"
      startIcon={<SearchIcon />}
      onClick={onClickSubmitButton}
    >
      消息
        </Button>
  </>);
};
