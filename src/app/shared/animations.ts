import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Component transition animations
export const nextPrevAnimation: AnimationEntryMetadata =
  trigger('NextPrevAnimation',
        [
            transition('next => void', [
                style({opacity: 0, transform: 'translateX(100%)'}),
                animate('300ms ease-out')
            ]),
            transition('previous => void', [
                style({opacity: 0, transform: 'translateX(-100%)'}),
                animate('300ms ease-out')
            ])
        ]
    );
