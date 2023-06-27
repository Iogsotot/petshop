import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import PetshopService, { IReportResponse } from '../services/petshopService';
import { IReportData, ReportsHash } from '../components/report/report';
import { convertReports } from '../utils';
import { RootState, store } from './store';

const service = new PetshopService();

export const addReport = createAsyncThunk(
  'reports/addReport',
  async (report: IReportResponse) => {
    await service.createReport(report);
    return report;
  }
);

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async (reportId: string) => {
    await service.deleteReport(reportId);
    return reportId;
  }
);

export const addData = createAsyncThunk(
  'reports/addData',
  async (data: IReportData) => {
    const { reportId, newData } = data;
    await service.addDataItem(reportId, newData);
    return data;
  }
);

export const deleteData = createAsyncThunk(
  'reports/deleteData',
  async ({ reportId, dataId }: { reportId: string; dataId: string }) => {
    await service.deleteData(reportId, dataId);
    return { reportId, dataId };
  }
);

export const selectReportsSlice = (state: RootState) => state.reports;

export const selectReports = createSelector(
  [selectReportsSlice],
  (reportsSlice) => reportsSlice
);

export const selectMemoizedReports = createSelector(
  [selectReports],
  (reports) => reports
);

export const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    data: {} as ReportsHash,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setReports: (state, action: PayloadAction<ReportsHash>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        const report = action.payload;
        state.data[report.id] = report;
        state.loading = false;
      })
      .addCase(addReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add report.';
      })
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        const reportId = action.payload;
        delete state.data[reportId];
        state.loading = false;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete report.';
      })
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action) => {
        const { reportId, newData } = action.payload;
        const report = state.data[reportId];
        if (report) {
          report.data.push(newData);
        }
        state.loading = false;
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add data.';
      })
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        const { reportId, dataId } = action.payload;
        const report = state.data[reportId];
        if (report) {
          report.data = report.data.filter((data) => data.id !== dataId);
        }
        state.loading = false;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete data.';
      });
  },
});

export const fetchReports = () => {
  return async (dispatch: typeof store.dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const fetchedReports: IReportResponse[] = await service.getReports();
      dispatch(setReports(convertReports(fetchedReports)));
    } catch (error: unknown) {
      dispatch(setError('Failed to fetch reports.'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const { setReports, setLoading, setError } = reportsSlice.actions;

export default reportsSlice.reducer;
