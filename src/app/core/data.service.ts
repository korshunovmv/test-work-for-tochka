// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

// import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Item, selectItems } from '../models/item.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService  {
  rootApiUrl: string; 
  
  constructor(
    private http: HttpClient,
  ) {
    this.rootApiUrl = environment.rootApiUrl;
  }

  /** GET items from the server */
  getItems (): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.rootApiUrl}/items`)
      .pipe(
        tap(items => this.log(`fetched items`)),
        catchError(this.handleError('getItems', []))
      );
  }

  /** GET item by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<Item> {
    const url = `${this.rootApiUrl}/items/?id=${id}`;
    return this.http.get<Item[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} item id=${id}`);
        }),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }
  
  //////// Save methods //////////

  /** POST: add a new item to the server */
  addItem (item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.rootApiUrl}/items`, item, httpOptions).pipe(
      tap((item: Item) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: delete the item from the server */
  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.rootApiUrl}/items/${id}`;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem (item: Item): Observable<any> {
    return this.http.put(`${this.rootApiUrl}/items`, item, httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }


  /** GET selected items from the server */
  getSelectedItems (): Observable<selectItems[]> {
    return this.http.get<selectItems[]>(`${this.rootApiUrl}/selectedItems`)
      .pipe(
        tap(items => this.log(`fetched selected items`)),
        catchError(this.handleError('getSelectedItems', []))
      );
  }

  /** POST: add a selected item to the server */
  selectItem (itemId: number): Observable<any> {
    return this.http.post<selectItems>(`${this.rootApiUrl}/selectedItems`, <selectItems>{id: itemId}, httpOptions).pipe(
      tap(_ => this.log(`added item w/ id=${itemId}`)),
      catchError(this.handleError<selectItems>('selectItem'))
    );
  }

  /** DELETE: delete the selected item on the server */
  unselectItem (itemId: number): Observable<any> {
    const url = `${this.rootApiUrl}/selectedItems/${itemId}`;

    return this.http.delete<selectItems>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${itemId}`)),
      catchError(this.handleError<selectItems>('unselectItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DataService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('DataService: ' + message);
    console.log('DataService: ' + message);
  }
}