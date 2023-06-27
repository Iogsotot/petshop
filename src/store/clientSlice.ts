import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import PetshopService, { IClientResponse } from '../services/petshopService';
import { IClient } from '../components/client/client';
import { RootState, store } from './store';

const service = new PetshopService();

export const addClient = createAsyncThunk(
  'clients/addClient',
  async (client: IClientResponse) => {
    await service.createClient(client);
    return client;
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId: string) => {
    await service.deleteClient(clientId);
    return clientId;
  }
);

export const selectClientsSlice = (state: RootState) => state.clients;

export const selectClients = createSelector(
  [selectClientsSlice],
  (clientsSlice) => clientsSlice
);

export const selectMemoizedClients = createSelector(
  [selectClients],
  (clients) => clients
);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: [] as IClient[],
  reducers: {
    setClients: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(deleteClient.fulfilled, (state, action) => {
      const clientId = action.payload;
      return state.filter((client) => client.id !== clientId);
    });
  },
});

export const fetchClients = () => {
  return async (dispatch: typeof store.dispatch) => {
    const fetchedClients = await service.getClients();
    dispatch(setClients(fetchedClients));
  };
};

export const { setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
