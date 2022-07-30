// this service to get all notes from the api of users notes from backend
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseURL = 'https://routeegypt.herokuapp.com/';
  constructor(private _HttpClient: HttpClient) {}

  // this function to get all notes from api link in the text file of apis
  // : observable to be able to make subscribe above it
  getAllNotes(data: any): Observable<any> {
    // .post take url , body to post in the api
    return this._HttpClient.post(this.baseURL + 'getUserNotes', data);
  }

  // this function to push inputs user date in api in backend
  // : observable to be able to make subscribe above it
  addNotes(data: any): Observable<any> {
    // .post take url , body to post in the api
    return this._HttpClient.post(this.baseURL + 'addNote', data);
  }

  // this function to update or edit inputs user date in api in backend
  // : observable to be able to make subscribe above it
  updateNotes(data: any): Observable<any> {
    // .post take url , body to post in the api
    return this._HttpClient.put(this.baseURL + 'updateNote', data);
  }

  // this function to delete note from api which recieve noteID and token
  // : observable to be able to make subscribe above it
  deleteNote(data: any): Observable<any> {
    // you must make this syntax to function of delete only to solve problem of error in token or token not provided
    let options = {
      Headers: new HttpHeaders({}),
      body: {
        NoteID: data.NoteID,
        token: data.token,
      },
    };
    // .post take url , body to post in the api
    return this._HttpClient.delete(this.baseURL + 'deleteNote', options);
  }
}
