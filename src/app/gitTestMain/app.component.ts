import { Component} from '@angular/core';

import { MultipleCheckBox } from '../gitComponent/multipleCheckBox/multipleCheckBox.component';
import { PieChart } from '../gitComponent/pieChart/pieChart.component';
import { GitHub } from '../service/github.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent is the main class of this app
 * it put all other compoent together in the teamplate
 * it's also prodiding them the information they may need 
 */

export class AppComponent {

  public document:any;
  public userTab : Array<string>;
  public disableUser : Array<string>;
  public chartUser : Array<string>;
  public chartValue : Array<number>;

  
 

  constructor(private github:GitHub) {
    this.userTab=new Array();
    this.chartValue = new Array();
    this.chartUser = new Array();
    this.disableUser=new Array()
   }

  
  ngOnInit(){   
    this.github.getData().subscribe(res => {
      this.document =  res;
      this.initPie();
    });
  }
  
  /**
   * provide the the pie chart a tab of 
   * label and value without the disable user
   */
  initPie(): void{
   let tmpVal: Array<number>= [];

       this.document.forEach(element => {   

      if(element.user && this.userTab.includes(element.user.login)){
        tmpVal[this.userTab.indexOf(element.user.login)]++;
      }else{
        this.userTab.push(element.user.login);
        tmpVal.push(1);
      }
    });
 this.userTab.forEach(user=>{ 
    if(!this.disableUser.includes(user)){
      this.chartValue=[...this.chartValue,tmpVal[this.userTab.indexOf(user)]];
    }
 });
 // here is cause of a know issu of ng2chart
    setTimeout( () => {
      this.userTab.forEach(user=>{
        if(!this.disableUser.includes(user)){
          this.chartUser=[...this.chartUser,user];
        }
      })
    }); 
  }
  
  isDisplayable(doc: any):boolean{
    return this.disableUser.includes(doc);
  }

/**
 * onChange apply the changes to the app's components
 * @param event 
 */
 public onChange(event : Event): void {
    this.chartValue = new Array()
    setTimeout( () => {this.chartUser = new Array()});
    this.userTab = new Array();
    this.initPie();
  }

  /**
   * setUrl call gitHub service to realaod 
   * other data their is no control of the url yet
   * @param value  new URL
   */
  public setUrl(value : string){ 
    this.disableUser=new Array();
    this.github.getDataFromUrl(value).subscribe(res => {
      this.document =  res;
      this.userTab=new Array();
      this.chartValue = new Array()
      setTimeout( () => {this.chartUser = new Array()});
      this.initPie();
    });
  }
  
}
