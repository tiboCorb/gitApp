import {Injectable} from '@angular/core';
import {Response, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * this service call the github API
 */
@Injectable()
export class GitHub {

  constructor(private http : Http) {}

  /**
   * by default the app will load those data
   */
  getData() {
    return this
      .http
      .get('https://api.github.com/repos/nodejs/node/issues/17709/comments')
      .map((res : Response) => res.json()).catch(error =>{ 
        return [{status :error.status, statusText :error.statusText}]});;
  }
  /**
   * getDataFromUrl load data of the wanted issus from
   * github api
   * @param url is the link of the issues that we will load the data
   */
  getDataFromUrl(url : string) {

    const beginUrl : string = "https://api.github.com/repos";
    const endUrl : string = "/comments";

    return this
      .http
      .get( url.replace("https://github.com",beginUrl) + endUrl)
      .map((res : Response) => res.json()).catch(error =>{ 
        return [{status :error.status, statusText :error.statusText}]});;
  }

  /**
   * postComment is a function that send new message
   * to the github api on a default issue
   * @param comment message to post
   * @param token authenification token generate on an github account
   *
   */
  postComment(token : string, comment : any): any {
    var body = {
      "body": comment
    };
    return this
      .http
      .post('https://api.github.com/repos/jenaye/Tipnturn-front/issues/9/comments?access_toke' +
          'n=' + token + '', body)
      .map((res : Response) => {
        return res.json();
      })
      .catch(error =>{ 
      return [{status :error.status, statusText :error.statusText}]});
      }

   /**
   * postComment is a function that send new message
   * to the github api
   * @param comment message to post
   * @param token authenification token generate on an github account
   * @param url is the link of the issues that we will load the data
   *
   */
  postCommentToUrl(token : string, comment : any, url:string): any {
    
    const beginUrl : string = "https://api.github.com/repos";
    const endUrl : string = "/comments?access_token=";
    var body = {
      "body": comment
    };

    
    return this
      .http
      .post( url.replace("https://github.com",beginUrl)+endUrl + token + '', body)
      .map((res : Response) => {
        return res.json();
      })
      .catch(error =>{ 
      return [{status :error.status, statusText :error.statusText}]});
      }

}