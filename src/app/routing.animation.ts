import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* => home', [
    /* order */
    query(':enter, :leave', style({ position: 'fixed', width:'100%', height: '100%' })
      , { optional: true }),
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ], { optional: true })
    ])
  ]),
  transition('* <=> *', [
    /* order */
    query(':enter, :leave', style({ position: 'fixed', width:'100%', height: '100%' })
      , { optional: true }),
    group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);
