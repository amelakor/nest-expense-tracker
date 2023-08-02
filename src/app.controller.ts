import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data } from './data';
import { ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  @Get(':id')
  getReportById(@Param('id') id: string, @Param('type') type: ReportType) {
    return data.report.find(
      (report) => report.id === id && type === report.type,
    );
  }

  @Post()
  createReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: ReportType,
  ) {
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

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    let report = data.report.find((report) => report.id === id);

    if (report) {
      report = {
        ...report,
        source: body.source,
        amount: body.amount,
        updated_at: new Date(),
      };
    }

    data.report.map((el) => (el.id === report.id ? report : el));

    return report;
  }

  @Delete(':id')
  deleteReport() {
    return {};
  }
}
