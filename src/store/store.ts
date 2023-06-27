import { configureStore } from '@reduxjs/toolkit';
import clientsSlice, { selectMemoizedClients } from './clientSlice';
import reportsSlice, { selectMemoizedReports } from './reportSlice';

export const store = configureStore({
  reducer: {
    clients: clientsSlice,
    reports: reportsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectClients = selectMemoizedClients;
export const selectReports = selectMemoizedReports;
