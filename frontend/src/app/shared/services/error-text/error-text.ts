import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorText {
    get(error: HttpErrorResponse, className: string) {
    let appError: string;
    if (error.status === 404) {
      appError = `${className} not found`;
    } else if (error.status === 401) {
      appError = 'Not authorized';
    } else {
      appError = `Server generic error:<br>${error.error.statusCode} - ${error.error.error}<br>${error.error.message}`;
    }
    return appError;
  }
}
