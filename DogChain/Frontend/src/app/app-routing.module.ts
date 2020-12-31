import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginMenuComponent } from "./login-menu/login-menu.component";
import { RegisterMenuComponent } from "./register-menu/register-menu.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { PrimaryMessageComponent } from "./primary-message/primary-message.component";
import { DummyComponent } from "./dummy/dummy.component";
import { AuthorityHomeComponent } from "./authority-home/authority-home.component";
import { BreederHomeComponent } from "./breeder-home/breeder-home.component";
import { DoctorHomeComponent } from "./doctor-home/doctor-home.component";
import { LoginUserComponent } from "./login-user/login-user.component";
import { BreedersApprovalComponent } from "./breeders-approval/breeders-approval.component";
import { DoctorsApprovalComponent } from "./doctors-approval/doctors-approval.component";
import { DogBirthRegistrationComponent } from "./dog-birth-registration/dog-birth-registration.component";
import { DogBirthRegistrationApprovalComponent } from "./dog-birth-registration-approval/dog-birth-registration-approval.component";
import { DogOwnershipTransferComponent } from "./dog-ownership-transfer/dog-ownership-transfer.component";
import { DogOwnershipTransferApprovalComponent } from "./dog-ownership-transfer-approval/dog-ownership-transfer-approval.component";
import { BreedersListComponent } from "./breeders-list/breeders-list.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";
import { DogsListComponent } from "./dogs-list/dogs-list.component";
import { SingleBreederComponent } from "./single-breeder/single-breeder.component";
import { SingleDoctorComponent } from "./single-doctor/single-doctor.component";
import { SingleDogComponent } from "./single-dog/single-dog.component";
import { DeleteBreederComponent } from "./delete-breeder/delete-breeder.component";
import { DeleteDoctorComponent } from "./delete-doctor/delete-doctor.component";
import { DeleteDogRegistrationComponent } from "./delete-dog-registration/delete-dog-registration.component";
import { DeleteOwnershipTransferComponent } from "./delete-ownership-transfer/delete-ownership-transfer.component";
import { ApproveBreederComponent } from "./approve-breeder/approve-breeder.component";
import { ApproveDoctorComponent } from "./approve-doctor/approve-doctor.component";
import { ApproveDogRegistrationComponent } from "./approve-dog-registration/approve-dog-registration.component";
import { ApproveOwnershipTransferComponent } from "./approve-ownership-transfer/approve-ownership-transfer.component";
import { TotalDogsComponent } from "./total-dogs/total-dogs.component";
import { SoldDogsComponent } from "./sold-dogs/sold-dogs.component";
import { CurrentDogsComponent } from "./current-dogs/current-dogs.component";
import { DogVaccinationsComponent } from "./dog-vaccinations/dog-vaccinations.component";
import { DogTreatmentsComponent } from "./dog-treatments/dog-treatments.component";
import { VaccinateDogComponent } from "./vaccinate-dog/vaccinate-dog.component";
import { TreatDogComponent } from "./treat-dog/treat-dog.component";
import { TotalVaccinatedDogsComponent } from "./total-vaccinated-dogs/total-vaccinated-dogs.component";
import { TotalTreatedDogsComponent } from "./total-treated-dogs/total-treated-dogs.component";
import { ChangeHospitalComponent } from "./change-hospital/change-hospital.component";
import { VaccinationDataComponent } from "./vaccination-data/vaccination-data.component";
import { TreatmentDataComponent } from "./treatment-data/treatment-data.component";
import { AuthGuard } from "./auth.guard";
import { SecondaryMessageComponent } from "./secondary-message/secondary-message.component";

const routes: Routes = [
  { 
    path: "",
    redirectTo: "/login-menu",
    pathMatch: "full"
  },
  {
    path: "login-menu",
    component: LoginMenuComponent
  },
  {
    path: "register-menu",
    component: RegisterMenuComponent
  },
  {
    path: "register-user/:type",
    component: RegisterUserComponent,
    pathMatch: "full"
  },
  {
    path: "primary-message",
    component: PrimaryMessageComponent
  },
  {
    path: "dummy",
    component: DummyComponent
  },
  {
    path: "authority-home",
    component: AuthorityHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "breeder-home",
    component: BreederHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-home",
    component: DoctorHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login-user/:type",
    component: LoginUserComponent,
    pathMatch: "full"
  },
  {
    path: "approve-breeders",
    component: BreedersApprovalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "approve-doctors",
    component: DoctorsApprovalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dog-birth-registration/:breederId",
    component: DogBirthRegistrationComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-dog-birth-registrations",
    component: DogBirthRegistrationApprovalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dog-ownership-transfer/:dogId",
    component: DogOwnershipTransferComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-dog-ownership-transfers",
    component: DogOwnershipTransferApprovalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "breeders-list",
    component: BreedersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctors-list",
    component: DoctorsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "all-dogs-list",
    component: DogsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "breeder/:breederId",
    component: SingleBreederComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/:doctorId",
    component: SingleDoctorComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "dog/:dogId",
    component: SingleDogComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "delete-breeder/:breederId",
    component: DeleteBreederComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "delete-doctor/:doctorId",
    component: DeleteDoctorComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "delete-dog-birth-registration/:dogId",
    component: DeleteDogRegistrationComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "delete-dog-ownership-transfer/:dogId",
    component: DeleteOwnershipTransferComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-breeder/:breederId",
    component: ApproveBreederComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-doctor/:doctorId",
    component: ApproveDoctorComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-dog-birth-registration/:dogId",
    component: ApproveDogRegistrationComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "approve-dog-ownership-transfer/:dogId",
    component: ApproveOwnershipTransferComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "total-dogs/:breederId",
    component: TotalDogsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "sold-dogs/:breederId",
    component: SoldDogsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "current-dogs/:breederId",
    component: CurrentDogsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "dog-vaccination/:dogId",
    component: DogVaccinationsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "dog-treatment/:dogId",
    component: DogTreatmentsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "vaccinate-dog/:doctorId",
    component: VaccinateDogComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "treat-dog/:doctorId",
    component: TreatDogComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-vaccinated-dogs/:doctorId",
    component: TotalVaccinatedDogsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "doctor-treated-dogs/:doctorId",
    component: TotalTreatedDogsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "change-hospital/:doctorId",
    component: ChangeHospitalComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "vaccination-data/:vaccId",
    component: VaccinationDataComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "treatment-data/:treatId",
    component: TreatmentDataComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "secondary-message",
    component: SecondaryMessageComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
