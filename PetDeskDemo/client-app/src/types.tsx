export interface Appointment {
  appointmentId: number;
  appointmentType: string;
  createDateTime: Date;
  requestedDateTimeOffset: Date;
  user_User_Id: number,
  user: Client,
  animal_AnimalId: number,
  animal: Patient,
  appointmentConfirmed?: boolean,
  rescheduledDateTime?: Date,
  rescheduledDateTimeSaved?: boolean
}

export interface Client {
  userId: number,
  firstName: string,
  lastName: string,
  vetDataId: string
}

export interface Patient {
  animalId: number,
  firstName: string,
  species?: string,
  breed?: string
}
