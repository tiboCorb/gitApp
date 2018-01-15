import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Stats} from '../stats/stats.component';


@Component({selector: 'app-postComment',
            templateUrl: './postComment.component.html',
            styleUrls: ['./postComment.component.css']})

/**
 *PostComment is a component that 
 */
export class PostComment {
 
    @Input() token : string;
    @Output() comment = new EventEmitter();
    public currentToken : string;


  constructor() {
     this.currentToken='';
  }

    

    addComment(newComment: string) {
        if (newComment) {
            this
            .comment
            .emit(newComment);
        }
    }
  
}