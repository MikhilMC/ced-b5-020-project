import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { AuthorityService } from "./authority.service";
import { BreederService } from "./breeder.service";
import { DoctorService } from "./doctor.service";
import { MiscService } from "./misc.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { RegisterMenuComponent } from './register-menu/register-menu.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PrimaryMessageComponent } from './primary-message/primary-message.component';
import { DummyComponent } from './dummy/dummy.component';
import { AuthorityHomeComponent } from './authority-home/authority-home.component';
import { BreederHomeComponent } from './breeder-home/breeder-home.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { BreedersApprovalComponent } from './breeders-approval/breeders-approval.component';
import { DoctorsApprovalComponent } from './doctors-approval/doctors-approval.component';
import { DogBirthRegistrationComponent } from './dog-birth-registration/dog-birth-registration.component';
import { DogOwnershipTransferComponent } from './dog-ownership-transfer/dog-ownership-transfer.component';
import { BreedersListComponent } from './breeders-list/breeders-list.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DogsListComponent } from './dogs-list/dogs-list.component';
import { SingleBreederComponent } from './single-breeder/single-breeder.component';
import { SingleDoctorComponent } from './single-doctor/single-doctor.component';
import { SingleDogComponent } from './single-dog/single-dog.component';
import { DogBirthRegistrationApprovalComponent } from './dog-birth-registration-approval/dog-birth-registration-approval.component';
import { DogOwnershipTransferApprovalComponent } from './dog-ownership-transfer-approval/dog-ownership-transfer-approval.component';
import { DeleteBreederComponent } from './delete-breeder/delete-breeder.component';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';
import { DeleteDogRegistrationComponent } from './delete-dog-registration/delete-dog-registration.component';
import { DeleteOwnershipTransferComponent } from './delete-ownership-transfer/delete-ownership-transfer.component';
import { ApproveBreederComponent } from './approve-breeder/approve-breeder.component';
import { ApproveDoctorComponent } from './approve-doctor/approve-doctor.component';
import { ApproveDogRegistrationComponent } from './approve-dog-registration/approve-dog-registration.component';
import { ApproveOwnershipTransferComponent } from './approve-ownership-transfer/approve-ownership-transfer.component';
import { TotalDogsComponent } from './total-dogs/total-dogs.component';
import { SoldDogsComponent } from './sold-dogs/sold-dogs.component';
import { CurrentDogsComponent } from './current-dogs/current-dogs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginMenuComponent,
    RegisterMenuComponent,
    RegisterUserComponent,
    PrimaryMessageComponent,
    DummyComponent,
    AuthorityHomeComponent,
    BreederHomeComponent,
    DoctorHomeComponent,
    LoginUserComponent,
    BreedersApprovalComponent,
    DoctorsApprovalComponent,
    DogBirthRegistrationComponent,
    DogOwnershipTransferComponent,
    BreedersListComponent,
    DoctorsListComponent,
    DogsListComponent,
    SingleBreederComponent,
    SingleDoctorComponent,
    SingleDogComponent,
    DogBirthRegistrationApprovalComponent,
    DogOwnershipTransferApprovalComponent,
    DeleteBreederComponent,
    DeleteDoctorComponent,
    DeleteDogRegistrationComponent,
    DeleteOwnershipTransferComponent,
    ApproveBreederComponent,
    ApproveDoctorComponent,
    ApproveDogRegistrationComponent,
    ApproveOwnershipTransferComponent,
    TotalDogsComponent,
    SoldDogsComponent,
    CurrentDogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthorityService,
    BreederService,
    DoctorService,
    MiscService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
