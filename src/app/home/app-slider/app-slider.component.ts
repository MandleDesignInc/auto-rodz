import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MdlSlide} from './mdl-slide';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-slider',
    templateUrl: './app-slider.component.html',
    styleUrls: ['./app-slider.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
    animations: [
        trigger('fade', [
            state('inactive', style({
                // backgroundPosition: '0% 0%'
                opacity: '0'
            })),
            state('active',   style({
                // backgroundPosition: '50% 0%'
                opacity: '1'
            })),
            transition('inactive => active', animate('0.5s ease-in-out')),
            transition('active => inactive', animate('0.5s ease-in-out'))
        ]),
        trigger('slide', [
            state('inactive', style({
                transform: 'translateX(100%)'
            })),
            state('active', style({
                transform: 'translateX(0)'
            })),
            transition('inactive => active', [
                style({transform: 'translateX(-100%)'}),
                animate(500)
            ]),
            transition('active => inactive', [
                animate(500, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class AppSliderComponent implements AfterViewInit, OnDestroy {

    @Input() slides: MdlSlide[];
    @Input() auto: boolean = false;
    @Input() useIndicators: boolean = false;
    @Input() useChevrons: boolean = false;

    intervalId: number;
    timeout: number;

    activeIndex: number = -1;
    activeCaption: string = '';




    ngAfterViewInit(): void {

        this.slideTo(0);

        this.timeout = 5000;
        this.start();

    }

    ngOnDestroy(): void {
        this.stop();
    }

    manualSlideTo(index: number): void {

        this.stop();

        this.slideTo(index);

        if (this.auto) this.start();

    }

    slideTo(index: number): void {

        if (index >= this.slides.length) index = 0;

        if (index < 0) index = this.slides.length - 1;

        // disable current slide if present
        if (this.intervalId) this.slides[this.activeIndex].toggleState();

        // activate new slide
        this.slides[index].toggleState();

        this.activeCaption = this.slides[index].caption;

        this.activeIndex = index;

    }


    next(): void {
        this.slideTo(this.activeIndex + 1);
    }

    private _next(): void {
        this.next();
    }

    start(): void {
        this.intervalId = setInterval(this._next.bind(this), this.timeout);
        console.log('mdl-slider started: ' + this.intervalId);
    }

    stop(): void {

        if (this.intervalId) {
            clearInterval(this.intervalId);
            console.log('mdl-slider stopped: ' + this.intervalId);
        } else {
            console.log('mdl-slider not started');
        }

    }

}
