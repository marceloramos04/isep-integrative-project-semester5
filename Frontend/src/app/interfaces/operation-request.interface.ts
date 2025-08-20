export interface OperationRequest {
    id: number;
    patientId: string;
    patientName: string;
    operationTypeId: number;
    operationTypeName: string;
    priority: string;
    status: string;
    deadline: Date;
  }