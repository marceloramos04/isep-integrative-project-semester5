import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatTabsModule } from '@angular/material/tabs';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { AddStaffComponent } from './components/staff/add-staff/add-staff.component';
import { StaffService } from './services/staff.service';
import { ListRequestsComponent } from './components/operation-requests/list-requests/list-requests.component';
import { RequestDetailsComponent } from './components/operation-requests/request-details/request-details.component';
import { ListOperationTypesComponent } from './components/operation-type/list-operation-types/list-operation-types.component';
import { ListPatientsComponent } from './components/patient/list-patients/list-patients.component';
import { OperationTypeDetailsComponent } from './components/operation-type/operation-type-details/operation-type-details.component';
import { EditOperationTypeComponent } from './components/operation-type/edit-operation-type/edit-operation-type.component';
import { AuthModule } from '@auth0/auth0-angular';
import { PatientViewComponent } from './views/patient-view/patient-view.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { UpdatePatientComponent } from './components/patient/update-patient/update-patient.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuardComponent } from './components/auth-guard/auth-guard.component';
import { AddRequestComponent } from './components/operation-requests/add-request/add-request.component';
import { RegisterOperationTypeComponent } from './components/operation-type/register-operation-type/register-operation-type.component';
import { StaffDetailsComponent } from './components/staff/staff-details/staff-details.component';  // Import AuthModule from Auth0
import { DetailsPatientComponent } from './components/patient/details-patient/details-patient.component';  // Import AuthModule from Auth0
import { AuthClientConfig } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { DeleteRequestComponent } from './components/operation-requests/delete-request/delete-request.component';
import { PatientDetailsByPatientComponent } from './components/patient/patient-details-by-patient/patient-details-by-patient.component';
import { UpdatePatientByPatientComponent } from './components/patient/update-patient-by-patient/update-patient-by-patient.component';
import { ListSpecializationsComponent } from './components/specialization/list-specializations/list-specializations.component';
import { AddSpecializationsComponent } from './components/specialization/add-specializations/add-specializations.component';
import { EditSpecializationsComponent } from './components/specialization/edit-specializations/edit-specializations.component';
import { DetailsSpecializationComponent } from './components/specialization/details-specialization/details-specialization.component';
import { AllergyComponent } from './components/allergy/add-allergy/allergy.component';
import { ListAllergiesComponent } from './components/allergy/list-allergies/list-allergies.component';
import { AddRoomTypeComponent } from './components/roomType/add-room-type/add-room-type.component';
import { ListRoomTypesComponent } from './components/roomType/list-room-type/list-room-types.component';
import { ListPatientByDoctorComponent } from './components/patient/by-doctor/list-patient-by-doctor/list-patient-by-doctor.component';
import { PatientDetailsByDoctorComponent } from './components/patient/by-doctor/patient-details-by-doctor/patient-details-by-doctor.component';
import { UpdateAllergiesComponent } from './components/patient/by-doctor/update-allergies/update-allergies.component';
import { MedicalConditionListComponent } from './components/medical-condition/medical-condition-list/medical-condition-list.component';
// import { RemoveSpecializationsComponent } from './components/specialization/remove-specializations/remove-specializations.component';
// import { DetailsSpecializationsComponent } from './components/specialization/details-specializations/details-specializations/details-specializations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminViewComponent,
    ListRequestsComponent,
    ListPatientsComponent,
    RequestDetailsComponent,
    ListOperationTypesComponent,
    OperationTypeDetailsComponent,
    EditOperationTypeComponent,
    PatientViewComponent,
    RegisterPatientComponent,
    UpdatePatientComponent,
    HospitalComponent,
    AuthGuardComponent,
    AddRequestComponent,
    RegisterOperationTypeComponent,
    AddStaffComponent,
    LoginComponent,
    StaffDetailsComponent,
    DetailsPatientComponent,
    DeleteRequestComponent,
    PatientDetailsByPatientComponent,
    UpdatePatientByPatientComponent,
    ListSpecializationsComponent,
    AddSpecializationsComponent,
    EditSpecializationsComponent,
    DetailsSpecializationComponent,
    AllergyComponent,
    ListAllergiesComponent,
    AddRoomTypeComponent,
    ListRoomTypesComponent,
    ListPatientByDoctorComponent,
    PatientDetailsByDoctorComponent,
    UpdateAllergiesComponent,
    MedicalConditionListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterLink,
    RouterOutlet,
    MatPaginator,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatNativeDateModule,
    AsyncPipe,
    MatCardModule,
    MatDatepickerModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTimepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    AuthModule.forRoot({  // This is where you provide the Auth0 configuration
      domain: 'dev-s53hobfonfz0p7il.us.auth0.com',  // Your Auth0 domain
      clientId: '7ZVAVTn195Xohi8vActgiJFb6kMt3mGj',  // Your Auth0 client ID
      //clientSecret: 'axDLxyth9ySfq0xFEVbTBRnBHnQ-rxllz51-oXNrPSWda9tAaWOCtjKiwywI3zWr',
      authorizationParams: {
        redirect_uri: window.location.origin,  // URL to redirect after login
        scope: 'openid profile email', // Inclui o escopo para obter o email
        useRefreshTokens: true,       // Para suporte a tokens de atualização
        silentCheckSso: false,
      }
    }),
  ],
  providers: [StaffService, UserService, provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})

export class AppModule { } 