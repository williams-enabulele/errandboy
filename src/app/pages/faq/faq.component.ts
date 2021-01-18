import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs: any = [];

  constructor(
    private generalService: GeneralService
  ) { }


  ngOnInit(): void {

    this.generalService.get_faqs().subscribe(
      res => {
        this.faqs = res['records'];
      }
    )
  }

}
