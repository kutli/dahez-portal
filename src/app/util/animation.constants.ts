import { style, animate, transition, trigger } from '@angular/animations';

export class Animations {
    public static readonly FADE_OUT = trigger('fadeOut', [
        transition('save', [
            animate(350, style({ opacity: 0}))
        ])
    ]);
}
