export interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    email: string;
    phoneNumber: string;
    specialization: string;
    availabilitySlots: { start: string; end: string }[];
}