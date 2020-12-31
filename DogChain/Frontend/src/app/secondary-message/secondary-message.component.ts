import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-secondary-message',
  templateUrl: './secondary-message.component.html',
  styleUrls: ['./secondary-message.component.css']
})
export class SecondaryMessageComponent implements OnInit {

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
