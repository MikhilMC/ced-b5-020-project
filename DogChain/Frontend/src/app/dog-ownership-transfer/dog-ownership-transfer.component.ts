import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-dog-ownership-transfer',
  templateUrl: './dog-ownership-transfer.component.html',
  styleUrls: ['./dog-ownership-transfer.component.css']
})
export class DogOwnershipTransferComponent implements OnInit {

  breederId: Number;
  dogId: Number;
  hasAlreadyApplied: Boolean;
  ownershipTransferForm = this._fb.group({
    newOwnerId: ['', [Validators.pattern(/[0-9]+/), Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
    private _actRouter: ActivatedRoute,
    private _router: Router,
    private _breeder: BreederService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._actRouter.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._breeder.hasAlreadySubmittedOwnershipTransfer(this.breederId, this.dogId)
      .subscribe(result => {
        console.log(result);
        if (result['hasAlreadySubmitted']) {
          // CASE : Ownership transfer request is already submitted,
          //        hence the owner can not submit this dog's ownership transfer request again
          //        without the authority approves or deletes the current request.
          this.hasAlreadyApplied = true;
        } else {
          // CASE : Ownership transfer request is not submitted,
          //        hence the owner can submit this dog's ownership transfer request
          this.hasAlreadyApplied = false;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      })
    });
  }

  transferOwnership() {
    let ownershipTransferData = {};
    ownershipTransferData['newOwnerId'] = Number(this.ownershipTransferForm.value['newOwnerId']);
    ownershipTransferData['currentOwnerId'] = this.breederId;
    ownershipTransferData['dogId'] = this.dogId;
    console.log(ownershipTransferData);
    this._breeder.dogOwnershipTransfer(ownershipTransferData)
    .subscribe(result => {
      console.log(result);
      if ("msg" in result) {
        // CASE : The dog haven't registered, 
        //        the given breeder is not the current owner of the dog,
        //        or the new owner with the given id is not registered.
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/dog-ownership-transfer', this.dogId]);
        });
      } else if("breederErrorMsg" in result) {
        // CASE : Wrong breederId. Working of this app is compromised.
        alert('Wrong breederId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : This dog's ownership transfer request is given for authority approval process.
        this._router.navigate(['/secondary-message'], {queryParams: {message: "Your dog's ownership transfer registration have been submitted for approval process. Please wait until the completion of approval process."}});
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    })
  }

}
