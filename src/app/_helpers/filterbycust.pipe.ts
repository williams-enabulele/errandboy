import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custFilter'
})
export class FilterbycustPipe implements PipeTransform {

  transform(value: any, customer_id:any): any {
    if(customer_id){
      //return value.filter(value=>value.toString().toLowerCase().includes(input.toString().toLowerCase()));
      return value.filter(value=>value.customer_id.toString().toLowerCase().includes(customer_id.toString().toLowerCase()) );
      //return value.filter(val =>val.toString().indexOf('input')>=0);
    }
    else {
      return value;
    }
    
  }

}
