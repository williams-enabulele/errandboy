import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mailpackage',
  templateUrl: './mailpackage.component.html',
  styleUrls: ['./mailpackage.component.scss']
})
export class MailpackageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    scrollTo(0,0);
  }

}
