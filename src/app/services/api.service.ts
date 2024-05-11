import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}`)
      .pipe(
        catchError(error => throwError(error))
      );
  }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}/repos`)
      .pipe(
        catchError(error => throwError(error))
      );
  }
}
