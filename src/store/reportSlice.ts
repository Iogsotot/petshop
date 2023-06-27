import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PetshopService, { IReportResponse } from '../services/petshopService';
import { IReportData, ReportsHash } from '../components/report/report';

import { convertReports } from '../utils';
import { store } from './store';

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

    builder.addCase(addData.fulfilled, (state, action) => {
      const { reportId, newData } = action.payload;
      const report = state[reportId];
      if (report) {
        report.data.push(newData);
      }
    });

    builder.addCase(deleteData.fulfilled, (state, action) => {
      const { reportId, dataId } = action.payload;
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
