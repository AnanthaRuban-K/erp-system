export enum UserRole {
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  FINANCE_MANAGER = 'finance_manager',
  SUPERVISOR = 'supervisor',
  EMPLOYEE = 'employee'
}

export enum Permission {
  // Admin permissions
  MANAGE_USERS = 'manage_users',
  MANAGE_ROLES = 'manage_roles',
  SYSTEM_CONFIG = 'system_config',
  
  // HR permissions
  MANAGE_EMPLOYEES = 'manage_employees',
  VIEW_ALL_ATTENDANCE = 'view_all_attendance',
  MANAGE_PAYROLL = 'manage_payroll',
  
  // Finance permissions
  MANAGE_LEDGER = 'manage_ledger',
  MANAGE_ACCOUNTS_PAYABLE = 'manage_accounts_payable',
  MANAGE_ACCOUNTS_RECEIVABLE = 'manage_accounts_receivable',
  
  // Employee permissions
  VIEW_OWN_DATA = 'view_own_data',
  APPLY_LEAVE = 'apply_leave',
  VIEW_PAYSLIPS = 'view_payslips',
  UPDATE_PROFILE = 'update_profile'
}

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  permissions: Permission[];
  organizationId?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  salary: number;
  joinDate: Date;
  isActive: boolean;
}

export interface FinanceSummary {
  revenue: number;
  expenses: number;
  profit: number;
  accounts_receivable: number;
  accounts_payable: number;
  currency: string;
}