import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) { }

  generatePreview(prompt: any): Observable<string> {
    const body = {
      title: JSON.stringify(prompt)
    }
    return this.http
      .post<{ title: string }>('https://dummyjson.com/products/add', body)
      .pipe(
        map(response => response.title)
      );
  }
}
