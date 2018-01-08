import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MarkdownModule } from 'angular2-markdown';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './gitTestMain/app.component';
import { MultipleCheckBox } from './gitComponent/multipleCheckBox/multipleCheckBox.component';
import { PieChart } from './gitComponent/pieChart/pieChart.component';
import { Stats } from './gitComponent/stats/stats.component';

import { GitHub } from './service/github.service';



@NgModule({
  declarations: [
    AppComponent,
    MultipleCheckBox,
    PieChart,
    Stats
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MarkdownModule.forRoot(),
    ChartsModule
  ],
  providers: [GitHub],
  bootstrap: [AppComponent]
})
export class AppModule { }