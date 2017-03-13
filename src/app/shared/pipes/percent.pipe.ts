import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'MyPercentPipe' })
export class MyPercentPipe implements PipeTransform {
  transform(value: any) {
	  if (value) {
           let unTrimmed = value*100 + "";
           let percent = unTrimmed.split('.')[0] + " %";
      	return percent;
	  }
	  return value;
  }

}