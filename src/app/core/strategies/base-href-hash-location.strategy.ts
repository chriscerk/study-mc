import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

@Injectable()
export class BaseHrefHashLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        const url = this.getBaseHref() + '#' + internal;
        return url;
    }
}
