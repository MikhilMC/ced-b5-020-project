import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._actRouter.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._breeder.hasAlreadySubmittedOwnershipTransfer(this.breederId, this.dogId)
      .subscribe(result => {
        console.log(result);
        if (result['hasAlreadySubmitted']) {
          this.hasAlreadyApplied = true;
        } else {
          this.hasAlreadyApplied = false;
        }
      }, error => {
        console.log(error);
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
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/dog-ownership-transfer', this.dogId]);
        });
      } else {
        this._router.navigate(['/secondary-message'], {queryParams: {message: "Your dog's ownership transfer registration have been submitted for approval process. Please wait until the completion of approval process."}});
      }
    }, error => {
      console.log(error);
    })
  }

}
