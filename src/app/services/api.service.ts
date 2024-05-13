import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getRepos(githubUsername: string, page: number, perPage: number): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
