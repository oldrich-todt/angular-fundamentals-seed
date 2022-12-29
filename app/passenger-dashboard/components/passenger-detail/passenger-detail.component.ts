import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: ` <div>
    <span class="status" [class.checked-in]="passenger.checkedIn"></span>
    <div *ngIf="editing">
      <input
        type="text"
        [value]="passenger.fullname"
        (input)="onNameChange(name.value)"
        #name
      />
    </div>
    <div *ngIf="!editing">{{ passenger.fullname }}</div>
    <div class="date">
      Check in date:
      {{
        passenger.checkedIn
          ? (passenger.checkedInDate | date : "MMMM d, y")
          : "Not checked in yet"
      }}
    </div>
    <div class="children">Children: {{ passenger.children?.length || 0 }}</div>
    <button (click)="toggleEdit()">
      {{ editing ? "Done" : "Edit" }}
    </button>
    <button (click)="onRemove()">Remove</button>
  </div>`,
})
export class PassengerDetailComponent {
  @Input("passenger") passenger: Passenger;

  @Output("remove") remove: EventEmitter<any> = new EventEmitter();
  @Output("edit") edit: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  constructor() {}

  onNameChange(name: string) {
    this.passenger.fullname = name;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.passenger);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.passenger);
  }
}
