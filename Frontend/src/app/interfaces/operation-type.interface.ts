export interface OperationType {
    id: number;
    name: string;
    requiredStaff: RequiredStaff[];
    estimatedDuration: number;
    status: string;
}

export interface RequiredStaff {
    role:string, 
    specialization:string, 
    quantity:number,
}

// export interface Status {
//     name: string,
//     value: boolean,
// }