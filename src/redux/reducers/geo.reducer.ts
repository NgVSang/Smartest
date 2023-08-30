import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPosition} from '../../types';
import {RootState} from '../store';

export type GeoState = {
  position?: IPosition;
  history: IPosition[];
};

const initialState: GeoState = {
  history: [],
};

const geoSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCurrentPosition: (state, action: PayloadAction<IPosition>) => {
      state.position = action.payload;
    },
    setHistoryPosition: (state, action: PayloadAction<IPosition>) => {
      let check = true;
      for (let i = 0; i < state.history.length; i++) {
        if (state.history[i].place_id === action.payload.place_id) {
          check = false;
          break;
        }
      }
      if (check) state.history = [...state.history, action.payload];
    },
    clearPosition: (state, action: PayloadAction) => {
      state.position = undefined;
    },
  },
});

export const geoSelector = (state: RootState) => state.geo;

export const {setCurrentPosition, setHistoryPosition, clearPosition} =
  geoSlice.actions;
export default geoSlice.reducer;
