import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../admin/order-details/details.service';
import { AuthService } from '../../_services/auth.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-assigned-orders',
  templateUrl: './assigned-orders.component.html',
  styleUrls: ['./assigned-orders.component.scss']
})
export class AssignedOrdersComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  //jsPDF:any;
  id: any;
  order_id:any;
  datas: any = [];
  items: any = [];
  showItems = false;
  showTotal = false;
  total: number;
  subTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private d: DetailsService,
    private authservice : AuthService
  ) { }

  ngOnInit(): void {

    
    const user = this.authservice.decode();
    this.id = user.data['id'];

    this.order_id = this.route.snapshot.paramMap.get('id');
    this.d.get_order_one(this.order_id).subscribe(
      res => {
        //console.log(res)
        this.datas = res['records']['0'];

      }
    )

    this.d.get_order_items(this.order_id).subscribe(
      res => {
        this.showItems = true;
        this.items = res['records'];
        for (let i = 0; i < this.items.length; i++) {
          this.subTotal += this.items[i].amount;
        }
        this.showTotal = true;
        this.total = this.subTotal + this.datas['cost'];

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
      doc.save('order.pdf');

    });




  }


}
