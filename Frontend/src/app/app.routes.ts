import { Routes } from '@angular/router';
import { CubeComponent } from './components/cube/cube.component';
// import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { DoctorViewComponent } from './views/doctor-view/doctor-view.component';
import { HomeComponent } from './components/home/home.component'
import { AddStaffComponent } from './components/staff/add-staff/add-staff.component';
import { DeletePatientComponent } from './components/patient/delete-patient/delete-patient.component';
import { ListPatientsComponent } from './components/patient/list-patients/list-patients.component';
import { ListRequestsComponent } from './components/operation-requests/list-requests/list-requests.component';
import { RequestDetailsComponent } from './components/operation-requests/request-details/request-details.component';
import { ListOperationTypesComponent } from './components/operation-type/list-operation-types/list-operation-types.component';
import { OperationTypeDetailsComponent } from './components/operation-type/operation-type-details/operation-type-details.component';
import { EditOperationTypeComponent } from './components/operation-type/edit-operation-type/edit-operation-type.component';
import { ListStaffComponent } from './components/staff/list-staff/list-staff.component';
import { PatientViewComponent } from './views/patient-view/patient-view.component';
import { UpdateStaffComponent } from './components/staff/update-staff/update-staff.component';
import { DeactivateStaffComponent } from './components/staff/deactivate-staff/deactivate-staff.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { AddRequestComponent } from './components/operation-requests/add-request/add-request.component';
import { RegisterOperationTypeComponent } from './components/operation-type/register-operation-type/register-operation-type.component';
import { StaffDetailsComponent } from './components/staff/staff-details/staff-details.component';
import { AuthGuardComponent } from './components/auth-guard/auth-guard.component';
import { UpdatePatientComponent } from './components/patient/update-patient/update-patient.component';
import { LoginComponent } from './login/login.component';
import { DetailsPatientComponent } from './components/patient/details-patient/details-patient.component';
import { AppComponent } from './app.component';
import { PatientDetailsByPatientComponent } from './components/patient/patient-details-by-patient/patient-details-by-patient.component';
import { UpdatePatientByPatientComponent } from './components/patient/update-patient-by-patient/update-patient-by-patient.component';
import { ListSpecializationsComponent } from './components/specialization/list-specializations/list-specializations.component';
import { AddSpecializationsComponent } from './components/specialization/add-specializations/add-specializations.component';
import { DetailsSpecializationComponent } from './components/specialization/details-specialization/details-specialization.component';
import { EditSpecializationsComponent } from './components/specialization/edit-specializations/edit-specializations.component';
import { AllergyComponent } from './components/allergy/add-allergy/allergy.component';
import { ListAllergiesComponent } from './components/allergy/list-allergies/list-allergies.component';
import { AddRoomTypeComponent } from './components/roomType/add-room-type/add-room-type.component';
import { ListRoomTypesComponent } from './components/roomType/list-room-type/list-room-types.component';
import { ListPatientByDoctorComponent } from './components/patient/by-doctor/list-patient-by-doctor/list-patient-by-doctor.component';
import { PatientDetailsByDoctorComponent } from './components/patient/by-doctor/patient-details-by-doctor/patient-details-by-doctor.component';
import { MedicalConditionListComponent } from './components/medical-condition/medical-condition-list/medical-condition-list.component';

export const routes: Routes = [
    // { path: "home", component: HomeComponent },
    // { path: 'user-page', component: UserPageComponent, canActivate: [AuthGuardComponent] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: '', component: LoginComponent },
    {
        path: 'admin-view', component: AdminViewComponent, children: [
            { path: 'add-staff', component: AddStaffComponent },
            { path: 'list-staff', component: ListStaffComponent },
            { path: 'staff-details/:id', component: StaffDetailsComponent },
            { path: 'update-staff/:id', component: UpdateStaffComponent },
            { path: 'deactivate-staff/:id', component: DeactivateStaffComponent },

            { path: 'register-patients', component: RegisterPatientComponent },
            { path: 'list-patients', component: ListPatientsComponent },
            { path: 'patient-details/:id', component: DetailsPatientComponent },
            { path: 'update-patient/:id', component: UpdatePatientComponent },
            { path: 'delete-patient', component: DeletePatientComponent },
            { path: 'delete-patient/:medicalRecordNumber', component: DeletePatientComponent },

            { path: 'register-operation-type', component: RegisterOperationTypeComponent },
            { path: 'list-operation-types', component: ListOperationTypesComponent },
            { path: 'operation-type-details/:id', component: OperationTypeDetailsComponent },
            { path: 'edit-operation-type/:id', component: EditOperationTypeComponent },

            { path: 'add-specializations', component: AddSpecializationsComponent },
            { path: 'list-specializations', component: ListSpecializationsComponent },
            { path: 'details-specialization/:id', component: DetailsSpecializationComponent },
            { path: 'edit-specialization/:id', component: EditSpecializationsComponent },

            { path: 'add-allergies', component: AllergyComponent },

            { path: 'add-room-type', component: AddRoomTypeComponent },
            { path: 'room-type', component: ListRoomTypesComponent },

        ]
    },

    {
        path: 'doctor-view', component: DoctorViewComponent, children: [

            { path: 'list-requests', component: ListRequestsComponent },
            { path: 'add-request', component: AddRequestComponent },
            { path: 'request-details/:id', component: RequestDetailsComponent },
            { path: 'hospital', component: HospitalComponent },
            { path: 'list-allergies', component: ListAllergiesComponent },

            { path: 'hospital', component: HospitalComponent },
            { path: 'patients', component: ListPatientByDoctorComponent },
            { path: 'patients/:id', component: PatientDetailsByDoctorComponent },
            { path: 'cube', component: CubeComponent },]

    },

    {
        path: 'patient-view/:id', component: PatientViewComponent, children: [
            { path: 'details-patient', component: PatientDetailsByPatientComponent },
            { path: 'update-patient', component: UpdatePatientByPatientComponent },
        ]
    },

    { path: "login", component: LoginComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];