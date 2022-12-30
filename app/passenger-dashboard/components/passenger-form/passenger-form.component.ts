import { Component, Input } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: ` <form #form="ngForm" novalidate>
    {{ detail?.fullname | json }}
    <div>
      <input type="text" name="fullname" [ngModel]="detail?.fullname" />
    </div>
    <div>
      <label>
        Check in:
        <input
          type="checkbox"
          name="checkedIn"
          [ngModel]="detail?.checkedIn"
          (ngModelChange)="toggleCheckIn($event)"
        />
      </label>
    </div>
    <div *ngIf="form.value.checkedIn">
      Checked in date:
      <input
        type="number"
        name="checkedInDate"
        [ngModel]="detail?.checkedInDate"
      />
    </div>
    {{ form.value | json }}
  </form>`,
})
export class PassengerFormComponent {
  @Input("detail") detail: Passenger;

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkedInDate = Date.now();
    }
  }
}
