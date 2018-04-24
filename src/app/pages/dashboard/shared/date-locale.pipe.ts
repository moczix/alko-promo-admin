import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

@Pipe({name: 'dateLocale'})
export class DateLocalePipe implements PipeTransform {
  transform(value: number): string {
    moment.locale('pl');
    const localTime = moment.utc(value).toDate();
    return moment(localTime).local().calendar();
  }
}
