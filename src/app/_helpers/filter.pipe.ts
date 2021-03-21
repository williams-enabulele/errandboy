import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any, input:any): any {
    if(input){
     
      return [value.filter(value=>value.order_no.toString().toLowerCase().includes(input.toString().toLowerCase()) ),value.filter(value=>value.customer_id.toString().toLowerCase().includes(input.toString().toLowerCase()))];
     
      
    }
    else {
      return value;
    }
    
  }



}
