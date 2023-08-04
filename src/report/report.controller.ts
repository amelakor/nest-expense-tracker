import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from '../data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  UpdateReportDto,
  ReportResponseDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(@Param('type') type: ReportType): ReportResponseDto[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.reportService.getReportById(id, type);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto {
    return this.reportService.createReport(body, type);
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateReport(id, type, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
