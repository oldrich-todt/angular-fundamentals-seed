import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { Passenger } from "./models/passenger.interface";

const PASSENGER_API = "/api/passengers";

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get(PASSENGER_API)
      .map((response: Response) => response.json());
  }
}
