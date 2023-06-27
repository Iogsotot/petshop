import { configureStore } from '@reduxjs/toolkit';
import { clientsSlice } from './clientSlice';
import { reportsSlice } from './reportSlice';

export const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    reports: reportsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
