import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({selector: 'app-stats',
            templateUrl: './stats.component.html',
            styleUrls: ['./stats.component.css']})

/**
 * Stats class work is to calculate stats  from
 * those tow input and display them
 * @input user is a list of label (string)
 * @input value is the list of related value of those labels
 */

export class Stats {
    @Input()user : Array < string >;
    @Input()value : Array < number >;
   
   
    constructor() {}

    ngOnInit() {
    }

    /**
     * findTalkativiestUser will search the hightest Value
     * in the value tab and return it's label
     * @returns label linked with the hightest Value
     */
    public findTalkativiestUser() : string {
        if(this.user.length !== 0) {

            const index = this.hightestValue();
            if (index !== -1) {

                return this.user[index];
            }
        }
        return '';
    }

    /**
     * hightestValue search the hightest Value
     * in the value's tab ans retrun the index
     * @return index of the biggest value
     */
    private hightestValue() : number {
        if(this.value.length !== 0) {

            let hightest = this.value[0];
            let hightestIndex = 0;

            for (let i = 1; i < this.value.length; i++) {
                if (this.value[i] > hightest) {
                    hightest = this.value[i];
                    hightestIndex = i;
                }
            }

            return hightestIndex;
        }
        return -1;
    }
    
    /** getCountOfMessage made a addition
     * of all the content of values tab and retrun
     * it
     * @returns total sum of each square of 'value'
     */
    public getCountOfMessage() {
        let count : number =0;
       ;
        for (let i = 0; i <  this.user.length; i++) {
         
            count = count + this.value[i];
        }
        return count;
    }

}
