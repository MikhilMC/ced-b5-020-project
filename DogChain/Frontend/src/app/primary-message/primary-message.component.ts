import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-primary-message',
  templateUrl: './primary-message.component.html',
  styleUrls: ['./primary-message.component.css']
})
export class PrimaryMessageComponent implements OnInit {

  message: String;

  constructor(
    private _actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._actRoute.queryParams.subscribe(params => {
      this.message = params["message"];
      console.log(this.message);
    });
  }

}
