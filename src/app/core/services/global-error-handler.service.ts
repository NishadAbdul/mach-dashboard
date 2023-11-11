import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as stackTraceParser from 'stacktrace-parser';
import { ErrorHandlerService } from './error-handler.service';


@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector,
        private _httpClient: HttpClient,
        private modalService: ErrorHandlerService) { }

    handleError(error: any) {
        const uiDateTime = new Date();
        const traceId = `ORIGINATE-${uiDateTime.getTime()}`;
        if(error instanceof ErrorEvent){
            if (environment.production) {
                this.modalService.openDialog({traceId: traceId, action: 'none'});
              //  this.log(error, typeOfError).subscribe();
            } else {
                this.modalService.openDialog({traceId: traceId});
                console.log(error);
            }
        } else {
            if (environment.production) {
                //  this.log(error, typeOfError).subscribe();
            } else {
                console.log(error);
            }
        }
    }

    log(error: any, errorType: string) {
        const errorToSend = this.addErrorInfo(error, errorType);
        return this.saveLog(errorToSend);
    }

    addErrorInfo(error: any, errorType: string) {
        const name = error.name || null;
        const type = errorType;
        const uiDateTime = new Date();
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const status = error.status || null;
        const message = error.message || error.toString();
        const stack = error instanceof HttpErrorResponse ? null : stackTraceParser.parse(error);
        const errorToSend = {name, type, uiDateTime, url, status, message, stack};
        return errorToSend;
      }

      saveLog(request: any) {
        const url = ""; //api endpoint to save log
        const bodyString = JSON.stringify(request);
        let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        // do not call httpApi as it will fail iteself in case of server failure
        return this._httpClient.post(url, bodyString, options);
    }
} 