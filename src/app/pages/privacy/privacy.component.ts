import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacies: any = [];

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.generalService.get_privacy().subscribe(
      res => {
        this.privacies = res['records'];
      }
    )
  }

}
