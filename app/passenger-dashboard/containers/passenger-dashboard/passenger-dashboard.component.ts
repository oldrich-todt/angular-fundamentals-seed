import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { Passenger } from "../../models/passenger.interface";

import { PassengerDashboardService } from "../../passenger-dashboard.service";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: ` <div>
    <passenger-count [items]="passengers"></passenger-count>
    <passenger-detail
      *ngFor="let passenger of passengers"
      [passenger]="passenger"
      (remove)="handleRemove($event)"
      (edit)="handleEdit($event)"
      (view)="handleView($event)"
    ></passenger-detail>
  </div>`,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(
    private router: Router,
    private passengerService: PassengerDashboardService
  ) {}
  ngOnInit(): void {
    this.passengerService.getPassengers().subscribe((data: Passenger[]) => {
      this.passengers = data;
    });
  }

  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .subscribe((passenger: Passenger) => {
        this.passengers = this.passengers.filter((p) => p.id !== passenger.id);
      });
  }

  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((passenger: Passenger) => {
        this.passengers = this.passengers.map((p) => {
          if (p.id === passenger.id) {
            p = { ...p, ...passenger };
          }

          return p;
        });
      });
  }

  handleView(event: Passenger) {
    this.router.navigate(["/passengers", event.id]);
  }
}
