import { Component, OnInit } from "@angular/core";

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
    ></passenger-detail>
  </div>`,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(private passengerService: PassengerDashboardService) {}
  ngOnInit(): void {
    this.passengers = this.passengerService.getPassengers();
  }

  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((p) => p.id !== event.id);
  }

  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((p) => {
      if (p.id === event.id) {
        p = { ...p, ...event };
      }

      return p;
    });
  }
}
