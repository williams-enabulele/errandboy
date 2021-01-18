import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  terms: any = [];
  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {

    this.generalService.get_terms().subscribe(
      res => {
        this.terms = res['records'];
      }
    )

  }




}


