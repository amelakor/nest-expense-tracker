import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports() {
    return [];
  }

  @Get(':id')
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return {};
  }

  @Put(':id')
  updateReport() {
    return {};
  }

  @Delete(':id')
  deleteReport() {
    return {};
  }
}
