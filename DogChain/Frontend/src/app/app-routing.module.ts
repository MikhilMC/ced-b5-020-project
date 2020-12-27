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
    component: AuthorityHomeComponent
  },
  {
    path: "breeder-home",
    component: BreederHomeComponent
  },
  {
    path: "doctor-home",
    component: DoctorHomeComponent
  },
  {
    path: "login-user/:type",
    component: LoginUserComponent,
    pathMatch: "full"
  },
  {
    path: "approve-breeders",
    component: BreedersApprovalComponent
  },
  {
    path: "approve-doctors",
    component: DoctorsApprovalComponent
  },
  {
    path: "dog-birth-registration/:breederId",
    component: DogBirthRegistrationComponent,
    pathMatch: "full"
  },
  {
    path: "approve-dog-birth-registrations",
    component: DogBirthRegistrationApprovalComponent
  },
  {
    path: "dog-ownership-transfer/:dogId",
    component: DogOwnershipTransferComponent,
    pathMatch: "full"
  },
  {
    path: "approve-dog-ownership-transfers",
    component: DogOwnershipTransferApprovalComponent
  },
  {
    path: "breeders-list",
    component: BreedersListComponent
  },
  {
    path: "doctors-list",
    component: DoctorsListComponent
  },
  {
    path: "all-dogs-list",
    component: DogsListComponent
  },
  {
    path: "breeder/:breederId",
    component: SingleBreederComponent,
    pathMatch: "full"
  },
  {
    path: "doctor/:docorId",
    component: SingleDoctorComponent,
    pathMatch: "full"
  },
  {
    path: "dog/:dogId",
    component: SingleDogComponent,
    pathMatch: "full"
  },
  {
    path: "delete-breeder/:breederId",
    component: DeleteBreederComponent,
    pathMatch: "full"
  },
  {
    path: "delete-doctor/:doctorId",
    component: DeleteDoctorComponent,
    pathMatch: "full"
  },
  {
    path: "delete-dog-birth-registration/:dogId",
    component: DeleteDogRegistrationComponent,
    pathMatch: "full"
  },
  {
    path: "delete-dog-ownership-transfer/:dogId",
    component: DeleteOwnershipTransferComponent,
    pathMatch: "full"
  },
  {
    path: "approve-breeder/:breederId",
    component: ApproveBreederComponent,
    pathMatch: "full"
  },
  {
    path: "approve-doctor/:doctorId",
    component: ApproveDoctorComponent,
    pathMatch: "full"
  },
  {
    path: "approve-dog-birth-registration/:dogId",
    component: ApproveDogRegistrationComponent,
    pathMatch: "full"
  },
  {
    path: "approve-dog-ownership-transfer/:dogId",
    component: ApproveOwnershipTransferComponent,
    pathMatch: "full"
  },
  {
    path: "total-dogs/:breederId",
    component: TotalDogsComponent,
    pathMatch: "full"
  },
  {
    path: "sold-dogs/:breederId",
    component: SoldDogsComponent,
    pathMatch: "full"
  },
  {
    path: "current-dogs/:breederId",
    component: CurrentDogsComponent,
    pathMatch: "full"
  },
  {
    path: "dog-vaccination/:dogId",
    component: DogVaccinationsComponent,
    pathMatch: "full"
  },
  {
    path: "dog-treatment/:dogId",
    component: DogTreatmentsComponent,
    pathMatch: "full"
  },
  {
    path: "vaccinate-dog/:doctorId",
    component: VaccinateDogComponent,
    pathMatch: "full"
  },
  {
    path: "treat-dog/:doctorId",
    component: TreatDogComponent,
    pathMatch: "full"
  },
  {
    path: "total-vaccinated-dogs/:doctorId",
    component: TotalVaccinatedDogsComponent,
    pathMatch: "full"
  },
  {
    path: "total-treated-dogs/:doctorId",
    component: TotalTreatedDogsComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
