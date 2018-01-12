import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * this service call the github API
 */
@Injectable()
export class GitHub {

    constructor(private http: Http) { }
  
  /**
   * by default the app will load thoese data
   */
  getData() {
    return this.http
        .get('https://api.github.com/repos/nodejs/node/issues/17709/comments')
          .map((res: Response) => res.json()
         
            );
  }
  /**
   * getDataFromUrl load data of the wanted issus from
   * github api
   * @param url wished URL
   */
  getDataFromUrl(url: string) {

    const beginUrl :string ="https://api.github.com/repos";
    const endUrl : string ="/comments";
    
    return this.http
        .get(beginUrl+url.replace("https://github.com",'')+endUrl)
          .map((res: Response) => res.json()
         
            );
  }

  /**
   * postComment is a function that send new message
   * to the github api
   * @param comment message to post
   * 
   */
  postComment( token:string ,comment :any){
    var toto = {
      "body" : comment
    };
    return this.http
            .post('https://api.github.com/repos/jenaye/Tipnturn-front/issues/9/comments?access_token='+token+'', toto)
            	.map((res: Response) => {
                	return res.json();
            });

}



  

}