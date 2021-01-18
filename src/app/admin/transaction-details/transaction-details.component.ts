import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionDetailsService } from './transaction-details.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  data: any = [];
  id: any;

  constructor(
    private t: TransactionDetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.t.get_transactions(this.id).subscribe(
      res => {
        this.data = res["records"][0];
      }
    )


  }

  public genPDF(): void {
    window.scrollTo(0, 0);
    html2canvas(this.htmlData.nativeElement).then(canvas => {

      let img = canvas.toDataURL("image/png");
      //document.body.appendChild(canvas);
      let doc = new jsPDF();
      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      let widthRatio = width / canvas.width;
      let heightRatio = height / canvas.height;
      let ratio = widthRatio > heightRatio ? heightRatio : widthRatio
      doc.addImage(img, 'JPEG', 0, 0, canvas.width * ratio, canvas.height * ratio);
      doc.save('transaction.pdf');

    });


  }



}
