import { configureStore } from '@reduxjs/toolkit';
import { clientsSlice } from './clientSlice';

export const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
