import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CarNumber } from './store/car-number';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<CarNumber[]>("http://localhost:3000/CarNumberInfo");
  }

  create(payload: CarNumber) {
    return this.http.post<CarNumber>("http://localhost:3000/CarNumberInfo", payload);
  }

  update(payload: CarNumber) {
    return this.http.put<CarNumber>(`http://localhost:3000/CarNumberInfo/${payload.id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/CarNumberInfo/${id}`);
  }

}
