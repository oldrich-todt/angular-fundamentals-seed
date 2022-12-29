import { Passenger } from "./models/passenger.interface";

export class PassengerDashboardService {
  constructor() {}

  getPassengers(): Passenger[] {
    return [
      {
        id: 1,
        fullname: "Chris",
        checkedIn: true,
        checkedInDate: 1490742000000,
        children: null,
      },
      {
        id: 2,
        fullname: "Jack",
        checkedIn: false,
        children: [
          {
            name: "Brian",
            age: 12,
          },
          {
            name: "Stanley",
            age: 8,
          },
        ],
      },
    ];
  }
}
