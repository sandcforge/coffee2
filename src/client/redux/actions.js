import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const actionSetApiLoading = createAction('SetApiLoading');
export const actionUpdateRocketStatus = createAction('UpdateRocketStatus');
export const actionLaunchRocket = createAction('LaunchRocket');



const asyncActionHelper = (func) => {
  return async (arg, thunkApi) => {
    try {
      thunkApi.dispatch(actionSetApiLoading(true));
      const ret = await func(arg, thunkApi);
      thunkApi.dispatch(actionSetApiLoading(false));
      return ret;
    } catch (err) {
      thunkApi.dispatch(actionSetApiLoading(false));
      console.log(err);
      switch (err.response.status) {
        case 408:
          console.log(err.response.status);
          alert('请5秒钟后再发送。');
          break;
      }

      throw err;
    }
  };
};

export const actionSubmitMessage = createAsyncThunk(
  'SubmitMessage',
  asyncActionHelper(async (arg, thunkApi) => {
    const result = await axios.post('/api/kickoff', arg);
    return result.data;
  })
);