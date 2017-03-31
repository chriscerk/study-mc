import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Component transition animations
export const nextPrevAnimation: AnimationEntryMetadata =
  trigger("NextPrevAnimation",
            [
                transition('next => void', [
                    style({transform: 'translateX(100%)'}),
                    animate('200ms ease-in')
                ]),
                transition('previous => void', [
                    style({transform: 'translateX(-100%)'}),
                    animate('200ms ease-in')
                ])
            ]
        )