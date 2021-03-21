import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transFilter'
})
export class TransfilterPipe implements PipeTransform {

  transform(value: any, order_no:any): any {
    if(order_no){
      //return value.filter(value=>value.toString().toLowerCase().includes(input.toString().toLowerCase()));
      return value.filter(value=>value.order_no.toString().toLowerCase().includes(order_no.toString().toLowerCase()) );
      //return value.filter(val =>val.toString().indexOf('input')>=0);
    }
    else {
      return value;
    }
    
  }

}
