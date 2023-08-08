import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}
  getSummary() {
    console.log(this.reportService);
    const incomes = this.reportService.getAllReports(ReportType.INCOME);
    const expenses = this.reportService.getAllReports(ReportType.EXPENSE);

    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
}
