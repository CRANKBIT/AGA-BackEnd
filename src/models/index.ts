/* eslint-disable arrow-body-style */
import mongoose from 'mongoose'
import { ICompany, CompanySchema } from './private/Company'
import { ITenant, TenantSchema } from './private/Tenant'
import { IReport, ReportSchema } from './Report'
import { IUser, UserSchema } from './User'
import { IVehicle, VehicleSchema } from './Vehicle'

export interface IModels {
  Company: mongoose.Model<ICompany>
  Tenant: mongoose.Model<ITenant>
  Report: mongoose.Model<IReport>
  User: mongoose.Model<IUser>
  Vehicle: mongoose.Model<IVehicle>
}

export const privateModel = (connection: mongoose.Connection): IModels => {
  return {
    Company: connection.model<ICompany>('Company', CompanySchema),
    Tenant: connection.model<ITenant>('Tenant', TenantSchema),
    Report: null,
    User: null,
    Vehicle: null,
  }
}

export const publicModel = (connection: mongoose.Connection): IModels => {
  return {
    Company: null,
    Tenant: null,
    Report: connection.model<IReport>('Report', ReportSchema),
    User: connection.model<IUser>('User', UserSchema),
    Vehicle: connection.model<IVehicle>('Vehicle', VehicleSchema),
  }
}
