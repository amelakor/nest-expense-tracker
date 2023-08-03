import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportType } from './data';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportById(id: string, type: ReportType) {
    return data.report.find(
      (report) => report.id === id && type === report.type,
    );
  }
  createReport(body: { source: string; amount: number }, type: ReportType) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }
  updateReport(
    id: string,
    type: ReportType,
    body: { source: string; amount: number },
  ) {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex !== -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}
