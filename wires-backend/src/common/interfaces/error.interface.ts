export interface IError {
  query?: string;
  parameters?: Array<ParameterClass | string>;
  driverError?: IError;
  length: number;
  severity: string;
  code: string;
  detail: string;
  schema: string;
  table: string;
  constraint: string;
  file: string;
  line: string;
  routine: string;
  name?: string;
}

export interface ParameterClass {
  id: string;
}
