import {Component} from '@angular/core';

import {MultipleCheckBox} from '../gitComponent/multipleCheckBox/multipleCheckBox.component';
import {PieChart} from '../gitComponent/pieChart/pieChart.component';
import {PostComment} from '../gitComponent/postComment/postComment.component'
import {Message} from '../gitComponent/message/message.component'
import {GitHub} from '../service/github.service';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})

/**
 * AppComponent is the main class of this app
 * it put all other compoent together in the teamplate
 * it's also prodiding them the information they may need
 */

export class AppComponent implements OnChanges {

  public document : any;
  public userTab : Array < string >;
  public disableUser : Array < string >;
  public chartUser : Array < string >;
  public chartValue : Array < number >;
  public token : string;
  public message : string;
  public title : string;
  public showDialog : boolean;

  private defaultURL : string = "https://github.com/nodejs/node/issues/17709";
  private curentURL : string;

  constructor(private github : GitHub) {
    this.userTab = new Array();
    this.chartValue = new Array();
    this.chartUser = new Array();
    this.disableUser = new Array()
    this.token = '';
    this.message = '';
    this.title = '';
    this.showDialog = false;
    this.curentURL = '';
  }

  ngOnInit() {
    if (this.curentURL === '') {
      this
        .github
        .getDataFromUrl(this.defaultURL)
        .subscribe(res => {
          if (res.status) {
            this.title = "Loading error"
            this.message = "you may have overpass your number of github query for today please retry later. "
            this.showDialog = true;
          }
          this.document = res;
          this.initPie();
        });
    } else {
      this
        .github
        .getDataFromUrl(this.curentURL)
        .subscribe(res => {
          if (res.status) {
            this.title = "Loading error"
            this.message = "you may have overpass your number of github query for today please retry later. "
            this.showDialog = true;
          }
          this.document = res;
          this.initPie();
        });
    }
  }
  ngOnChanges() {}

  /**
   * provide the the pie chart a tab of
   * label and value without the disable user
   */
  initPie() : void {
    let tmpVal: Array < number >= [];

    this
      .document
      .forEach(element => {

        if (element.user && this.userTab.includes(element.user.login)) {
          tmpVal[
            this
              .userTab
              .indexOf(element.user.login)
          ]++;
        } else {
          this
            .userTab
            .push(element.user.login);
          tmpVal.push(1);
        }
      });
    this
      .userTab
      .forEach(user => {
        if (!this.disableUser.includes(user)) {
          this.chartValue = [
            ...this.chartValue,
            tmpVal[
              this
                .userTab
                .indexOf(user)
            ]
          ];
        }
      });
    // here is cause of a know issu of ng2chart
    setTimeout(() => {
      this
        .userTab
        .forEach(user => {
          if (!this.disableUser.includes(user)) {
            this.chartUser = [
              ...this.chartUser,
              user
            ];
          }
        })
    });
  }

  isDisplayable(doc : any) : boolean {
    return this
      .disableUser
      .includes(doc);
  }

  /**
 * onChangeCheckBox apply the changes to the app's components
 * @param event
 */
  public onChangeCheckBox(event : Event) : void {
    this.chartValue = new Array();
    setTimeout(() => {
      this.chartUser = new Array()
    });
    this.userTab = new Array();
    this.initPie();
  }

  /**
 * onChangePostComment sent the message to github service
 * @param event
 */
  public onChangePostComment(event : Event) : void {
    if(this.curentURL === '') {
      this
        .github
        .postComment(this.token, event)
        .subscribe(res => {
          if (res.status) {
            this.title = "Token invalide"
            this.message = "you need a valid token to post a comment"
            this.showDialog = true;
          }
        })
    } else {
      this
        .github
        .postCommentToUrl(this.token, event, this.curentURL)
        .subscribe(res => {
          if (res.status) {
            this.title = "Token invalide"
            this.message = "you need a valid token to post a comment"
            this.showDialog = true;
          }
        })
    }
  }

  /**
   * setUrl call gitHub service to realaod
   * other data their is no control of the url yet
   * @param value  new URL
   */
  public setUrl(value : string) {
    this.disableUser = new Array();
    this
      .github
      .getDataFromUrl(value)
      .subscribe(res => {
        if (res.status) {
          this.title = "URL invalide"
          this.message = "it must be like folowing : https://github.com/USER_NAME/REPO/issues/NUMBER_OF_ISSUE"
          this.showDialog = true;
        } else {
          this.document = res;
          this.userTab = new Array();
          this.chartValue = new Array()
          setTimeout(() => {
            this.chartUser = new Array()
          });
          this.initPie();
        }
      });
  }

  public setToken(value : string) {
    this.token = value;
  }

}
