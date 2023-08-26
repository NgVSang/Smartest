import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import React from 'react';
import {RootState} from '../store';

export type ModalState = {
  isOpen: boolean;
  content?: React.ReactNode;
  actions?: React.ReactNode[];
  handleConfirm?: () => void;
  onClose?: () => void;
};

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        content?: React.ReactNode;
        actions?: React.ReactNode[];
        onClose?: () => void;
      }>,
    ) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.actions = action.payload.actions;
      state.onClose = action.payload.onClose;
    },
    closeModal: (state, action: PayloadAction) => {
      state.isOpen = false;
      state.content = undefined;
      state.actions = [];
      state.onClose = undefined;
    },
  },
});

export const modalSelector = (state: RootState) => state.modal;

export const {closeModal, openModal} = modalSlice.actions;
export default modalSlice.reducer;
