import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BbService {
  private url: String = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getBbs(): Observable<Object[]> {
    return this.http.get<Object[]>(this.url + '/api/bbs/');
  }

  getBb(pk: Number): Observable<Object> {
    return this.http.get<Object>(this.url + '/api/bbs/' + pk);
  }

  handleError() {
    return (error: any): Observable<Object> => {
        window.alert(error.message);
        return of(null);
    }
  }

  addComment(bb: String, author: String, password: String, content: String):
    Observable<Object> {
    const comment = {'bb': bb, 'author': author, 'content': content};
    const options = {headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization': 'Basic ' + window.btoa(author + ':' + password)})};
    return this.http.post<Object>(this.url + '/api/bbs/' + bb +
      '/comments/', comment, options).pipe(catchError(this.handleError()));
  }
  
  getComments(pk: Number): Observable<Object[]> {
    return this.http.get<Object[]>(this.url + '/api/bbs/' + pk +
      '/comments/');
  }
}
