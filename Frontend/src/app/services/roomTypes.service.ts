import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { otherBackendUrl } from '../app.config';
import { map, Observable } from 'rxjs';
import { RoomType } from '../interfaces/roomType.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomTypesService {

  url = otherBackendUrl + '/roomType';

  constructor(private http: HttpClient) { }

  searchRoomTypes(params: { name?: string, description?: string }): Observable<RoomType[]> {
    let httpParams = new HttpParams();

    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }
    if (params.description) {
      httpParams = httpParams.set('description', params.description);
    }

    return this.http.get<RoomType[]>(this.url + '/RoomTypes/:name', { params: httpParams });
  }

  createRoomType(roomType: RoomType): Observable<RoomType> {
    return this.http.post<RoomType>(this.url + '/createRoomType', roomType);
  }

  getRoomTypeById(name: string): Observable<RoomType> {
    return this.http.get<RoomType>(this.url + '/:' + name);
  }

  updateRoomType(roomType: RoomType): Observable<RoomType> {
    return this.http.put<RoomType>(this.url + '/' + roomType.name, roomType);
  }

  deleteRoomType(name: string): Observable<any> {
    return this.http.delete(this.url + '/' + name);
  }

  getFilteredRoomTypes(
    name?: string,
    description?: string
  ): Observable<RoomType[]> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name', name);
    }
    if (description) {
      params = params.set('description', description);
    }

    return this.http.get<RoomType[]>(this.url + '/RoomTypes', { params });
  }
}
