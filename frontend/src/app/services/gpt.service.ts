import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptService {

  constructor(private http: HttpClient) { }

  generatePreview(userInput: any): Observable<string> {
    const body = {
      userInput: JSON.stringify(userInput)
    }
    return this.http
      .post<{ preview: string }>('http://localhost:3000/api/gpt/preview', body)
      .pipe(
        map(response => response.preview)
      );
  }
}
