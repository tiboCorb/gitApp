import {Component, OnInit, Input, Output,OnChanges, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    animations: [trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(100)
            ]),
            transition('* => void', [animate(100, style({transform: 'scale3d(.0, .0, .0)'}))])
        ])]
})

/**
 * this component provide mulitiple checkbox item
 * that will be splited in tree columns
 */

export class Message implements OnInit {

    @Input()type : string;
    @Input()message : string;
    @Input()title : string;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
      }

}
