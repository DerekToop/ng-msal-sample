import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmcHttpService {

  constructor(protected http: HttpClient) { }

  httpGet<T>(url: string, operation: string): Observable<T> {
    return this.http.get<T>(url)
      .pipe(
        tap(_ => {
          console.log(`fetched data: ` + JSON.stringify(_));
        }),
      );
  }
}
