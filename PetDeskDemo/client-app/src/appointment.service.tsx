import { Appointment } from "./types";

export default class AppointmentService {

  setRescheduleDate(date: Date, appt: Appointment) {
    appt.rescheduledDateTime = date;
    return appt;
  }

  clearRescheduledDate(appt: Appointment) {
    appt.rescheduledDateTime = undefined;
    appt.rescheduledDateTimeSaved = false;
    return appt;
  }

  async saveRescheduledDate(appt: Appointment) {    
    if (appt.rescheduledDateTime) {
      appt.rescheduledDateTimeSaved = true;
      appt.appointmentConfirmed = false;
      appt = await this.saveAppointmentData(appt) as Appointment;
    }
    return appt;
  }

  async confirmAppointment(appointment: Appointment) {
    appointment.appointmentConfirmed = true;
    if (appointment.rescheduledDateTime) appointment.requestedDateTimeOffset = appointment.rescheduledDateTime;
    appointment.rescheduledDateTime = undefined;
    appointment.rescheduledDateTimeSaved = undefined;
    const resp = await this.saveAppointmentData(appointment) as Appointment;
    return resp;
  }

  async getAppointmentsData() {
    try {
      return await fetch('https://localhost:7032/appointment/api/allappointments');
    }
    catch (error) {
      console.log('Error fetching appointments', error);
    }
  }

  async getAppointmentData(id: number) {
    try {
      return await fetch(`https://localhost:7032/appointment/api/appointment/${id}`);
    }
    catch (error) {
      console.log('Error fetching appointment', error);
    }
  }

  private async saveAppointmentData(appt: Appointment) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(appt)
    };
    try {
      const response = await fetch(`https://localhost:7032/appointment/api/appointment/${appt.appointmentId}`, requestOptions);
      return response.json();
    }
    catch (error) {
      console.log('Error saving appt', error);
    }
  }
}