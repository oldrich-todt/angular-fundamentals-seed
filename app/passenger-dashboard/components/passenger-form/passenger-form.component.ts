import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: ` <form
    #form="ngForm"
    (ngSubmit)="handleSubmit(form.value, form.valid)"
    novalidate
  >
    <div>
      <input
        type="text"
        name="fullname"
        #fullname="ngModel"
        [ngModel]="detail?.fullname"
        required
      />
      <div *ngIf="fullname.errors?.required && fullname.touched" class="error">
        Passenger name is required
      </div>
    </div>

    <div>
      <input
        type="number"
        name="id"
        #id="ngModel"
        [ngModel]="detail?.id"
        required
      />
      <div *ngIf="id.errors?.required && id.touched" class="error">
        Passenger ID is required
      </div>
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
    <div>
      Luggage:
      <select name="baggage" [ngModel]="detail?.baggage">
        <option
          *ngFor="let item of baggage"
          [value]="item.key"
          [selected]="item.key === detail?.baggage"
        >
          {{ item.value }}
        </option>
      </select>
    </div>
    <button type="submit" [disabled]="form.invalid">Update passenger</button>
  </form>`,
})
export class PassengerFormComponent {
  @Input("detail") detail: Passenger;

  @Output("update") update: EventEmitter<Passenger> = new EventEmitter();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No baggage",
    },
    {
      key: "hand-only",
      value: "Hand baggage",
    },
    {
      key: "hold-only",
      value: "Hold baggage",
    },
    {
      key: "hand-hold",
      value: "Hand and hold baggage",
    },
  ];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkedInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, valid: boolean) {
    if (valid) {
      this.update.emit(passenger);
    }
  }
}
