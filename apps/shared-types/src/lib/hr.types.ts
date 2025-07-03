export interface PayrollData {
  employeeId: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
}

export interface AttendanceRecord {
  employeeId: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'casual' | 'sick' | 'annual' | 'maternity';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}