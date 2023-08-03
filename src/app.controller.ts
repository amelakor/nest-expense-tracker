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
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(@Param('type') type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(@Param('id') id: string, @Param('type') type: ReportType) {
    return this.appService.getReportById(id, type);
  }

  @Post()
  createReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: ReportType,
  ) {
    return this.appService.createReport(body, type);
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Param('type') type: ReportType,
    @Body() body: { source: string; amount: number },
  ) {
    return this.appService.updateReport(id, type, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
