import {Component, Input, Output, EventEmitter} from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({selector: 'app-multipleCheckBox',
            templateUrl: './multipleCheckBox.component.html',
            styleUrls: ['./multipleCheckBox.component.css']})

/**
 * this component provide mulitiple checkbox item
 * that will be splited in tree columns
 * @param userTab here reprensente the list of label
 * @param disableUser stands for disable label (not to show)
 * @returns disableUserUpdate is the updated list of disable label
 */

export class MultipleCheckBox implements OnChanges {

  @Input()userTab : Array < string >;
  @Input()disableUser : Array < string >;
  @Output()disableUserUpdate = new EventEmitter();

  constructor() {}

  ngOnChanges(changes : SimpleChanges){}

  /**
     * isDisplayable is use in the template
     * it returns a boolean which will help
     * us to know if we have to display the
     * line or not
     * @param name  string keyword, if in the disableUser
     * list it will retrun true
     */
  private isDisplayable(name : string) : boolean {
    return this
      .disableUser
      .includes(name);
  }

  /**
       * changeDisableStatues is use in the template to
       * remove or add keyword in the disableUser list
       * @param user keytword to add or remove
       * @param check statement of the checkbox
       */
  changeDisableStatues(user : string, check : boolean) {
    if (check) {

      this
        .disableUserUpdate
        .emit(this.disableUser.push(user));
    } else {

      this
        .disableUserUpdate
        .emit(this.disableUser.splice(this.disableUser.indexOf(user), 1));
    }
  }
}