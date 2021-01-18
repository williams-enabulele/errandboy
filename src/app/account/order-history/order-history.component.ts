import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../admin/order-details/details.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;

  //jsPDF:any;
  order_id: any;
  datas: any = [];
  items: any = [];
  showItems = false;
  showTotal = false;
  total: number;
  subTotal: number = 0;
  showCancelBtn=true;
  order_no: any;
  data: any;
  

  constructor(
    private route: ActivatedRoute,
    private d: DetailsService,
    private a: AccountService,
    private t: ToastrService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
   }

  

  ngOnInit(): void {

    this.order_id = this.route.snapshot.paramMap.get('id');
    this.d.get_order_one(this.order_id).subscribe(
      res => {
        //console.log(res)
        this.datas = res['records']['0'];
        this.order_no = this.datas.order_no;

        if(this.datas.status == "Completed" || this.datas.status == "Cancelled"){
          this.showCancelBtn = false ;
                }

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

  open(cancel) {
    this.modalService.open(cancel);
  }

  cancelOrder(){

    this.data = { order_id: this.order_id, status_id: 5 };
    this.a.updateStatus(this.data).subscribe(
      res =>{
        this.t.success("Order with number: " + this.order_no + " has been successfully cancelled");
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
