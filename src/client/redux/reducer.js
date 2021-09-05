import { createReducer } from '@reduxjs/toolkit';
import {
  actionUpdateRocketStatus,
  actionSetApiLoading,
  actionLaunchRocket,
} from './actions.js';
import { APP_CONST } from '../constants';
const status = Array.from({ length: APP_CONST.orbitNumber }, (_, i) => -1);
console.log(status);
const message = Array.from({ length: APP_CONST.orbitNumber }, (_, i) => '');

const initialState = {
  rocket: {
    status,
    message,
    nextRocketIndex: 0,
  },
  ui: {
    isApiLoading: false,
  }
};


export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionSetApiLoading, (state, action) => {
      state.ui.isApiLoading = action.payload;
    })
    .addCase(actionUpdateRocketStatus, (state, action) => {
      const { index } = action.payload;
      state.rocket.status[index] = -1;
      state.rocket.message[index] = '';

    })
    .addCase(actionLaunchRocket, (state, action) => {
      state.rocket.status[state.rocket.nextRocketIndex] = 0;
      state.rocket.message[state.rocket.nextRocketIndex] = action.payload;
      state.rocket.nextRocketIndex = (state.rocket.nextRocketIndex + 1) % APP_CONST.orbitNumber;
    });


});