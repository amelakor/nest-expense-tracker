import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
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
    @Param('type') type: ReportType,
    @Body() body: { source: string; amount: number },
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

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex !== -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}
