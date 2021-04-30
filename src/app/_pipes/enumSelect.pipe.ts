import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'enumSelect' })
export class EnumSelectPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

  // enumType: Enum   
  // enumName: locale char chain
  
    transform(enumType: any, enumName: string): any {
        const self = this;
        const enumItems = [];   

        // tslint:disable-next-line:forin
        for (const enumMember in enumType) {

            const enumOrdinal: number = parseInt(enumMember, 10);

            if (enumOrdinal >= 0) {
            
                const key = enumType[enumMember];

                const localeKey = enumName + '.' + key;

                const label = self.translate.instant(key);

                if (key === label) {
                    self.translate.get(localeKey).subscribe(msg => {
                        enumItems.push({ key: enumOrdinal, value: msg });
                    });
                } else {
                    enumItems.push({ key: enumOrdinal, value: label });
                }
            }
        }
        
        return enumItems;
    }
}
