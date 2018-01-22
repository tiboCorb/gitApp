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
   *use to be load by default the app will load those data
   *return list of comment in json
   */
  getData() {
    return this
      .http
      .get('https://api.github.com/repos/nodejs/node/issues/17709/comments')
      .map((res : Response) => res.json()).catch(error =>{ 
        return [{status :error.status, statusText :error.statusText}]});
  }
  /**
   *use to be load by default the app will load those data
   *return information on the default issue like title and also first 
   *post that doesn't not figure uuin the previous comments list
   */
  getIssueInfo() {
    return this
    .http
    .get('https://api.github.com/repos/nodejs/node/issues/17709')
    .map((res: Response) => res.json()).catch(error =>{ 
      return [{status :error.status, statusText :error.statusText}]}); 
  }
  /**
   * getDataFromUrl load data of the wanted issus from
   * github api
   * @param url is the link of the issues that we will load the data
   */
  getDataFromUrl(url: string) {

    const beginUrl = "https://api.github.com/repos";
    const endUrl: string = "/comments";

    return this
      .http
      .get( url.replace("https://github.com",beginUrl) + endUrl)
      .map((res: Response) => res.json()).catch(error =>{
        return [{status :error.status, statusText :error.statusText}]});
  }

   /**
   * getDataFromUrl load informations of the wanted issus from
   * github api
   * @param url is the link of the issues that we will load the informations
   */
  getIssueInfoFromUrl(url: string){
    const beginUrl = "https://api.github.com/repos";

    return this
    .http
    .get( url.replace('https://github.com',beginUrl))
    .map((res: Response) => res.json()).catch(error =>{
      return [{status :error.status, statusText :error.statusText}];});
  }

  /**
   * postComment is a function that send new message
   * to the github api on a default issue
   * @param comment message to post
   * @param token authenification token generate on an github account
   *
   */
  postComment(token: string, comment: any): any {
    const body = {
      'body': comment
    };
    return this
      .http
      .post('https://api.github.com/repos/jenaye/Tipnturn-front/issues/9/comments?access_toke' +
          'n=' + token + '', body)
      .map((res: Response) => {
        return res.json();
      })
      .catch(error => {
      return [{status : error.status, statusText : error.statusText}]; });
      }

   /**
   * postComment is a function that send new message
   * to the github api
   * @param comment message to post
   * @param token authenification token generate on an github account
   * @param url is the link of the issues that we will load the data
   *
   */
  postCommentToUrl(token: string, comment: any, url: string): any {

    const beginUrl = 'https://api.github.com/repos';
    const endUrl = '/comments?access_token=';
    const body = {
      'body': comment
    };


    return this
      .http
      .post( url.replace('https://github.com', beginUrl) + endUrl + token + '', body)
      .map((res: Response) => {
        return res.json();
      })
      .catch(error => {
      return [{status : error.status, statusText : error.statusText}]; });
      }

}
