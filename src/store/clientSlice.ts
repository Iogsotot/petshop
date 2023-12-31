import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import PetshopService, { IClientResponse } from '../services/petshopService';
import { IClient } from '../components/client/client';
import { RootState, AppDispatch } from './store';

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

export const setSearchValue = (value: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(clientsSlice.actions.setSearchValue(value));
  };
};

export const selectClientsSlice = (state: RootState) => state.clients;

export const selectClients = (state: RootState) =>
  selectClientsSlice(state).data;

export const selectMemoizedClients = createSelector(
  [selectClients],
  (clients) => clients
);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    data: [] as IClient[],
    loading: false,
    error: null as string | null,
    searchValue: '',
  },
  reducers: {
    setClients: (state, action: PayloadAction<IClient[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add client.';
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        const clientId = action.payload;
        state.data = state.data.filter((client) => client.id !== clientId);
        state.loading = false;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete client.';
      });
  },
});

export const fetchClients = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const fetchedClients = await service.getClients();
      dispatch(setClients(fetchedClients));
    } catch (error: unknown) {
      dispatch(setError('Failed to fetch clients.'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const { setClients, setLoading, setError } = clientsSlice.actions;

export default clientsSlice.reducer;
