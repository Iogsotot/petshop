import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PetshopService, { IReportResponse } from '../services/petshopService';
import { ReportsHash } from '../components/report/report';
import { store } from './store';
import { convertReports } from '../utils';

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

export const deleteData = createAsyncThunk(
  'reports/deleteData',
  async ({ dataId, reportId }: { dataId: string; reportId: string }) => {
    await service.deleteData(reportId, dataId);
    return { dataId, reportId };
  }
);

export const reportsSlice = createSlice({
  name: 'reports',
  initialState: {} as ReportsHash,
  reducers: {
    setReports: (state, action: PayloadAction<ReportsHash>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReport.fulfilled, (state, action) => {
      const report = action.payload;
      state[report.id] = report;
    });

    builder.addCase(deleteReport.fulfilled, (state, action) => {
      const reportId = action.payload;
      delete state[reportId];
    });

    builder.addCase(deleteData.fulfilled, (state, action) => {
      const { dataId, reportId } = action.payload;
      const report = state[reportId];
      if (report) {
        report.data = report.data.filter((data) => data.id !== dataId);
      }
    });
  },
});

export const fetchReports = () => {
  return async (dispatch: typeof store.dispatch) => {
    const fetchedReports: IReportResponse[] = await service.getReports();
    dispatch(setReports(convertReports(fetchedReports)));
  };
};

export const { setReports } = reportsSlice.actions;

export default reportsSlice.reducer;
