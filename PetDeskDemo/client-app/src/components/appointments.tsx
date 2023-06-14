import React, { Component } from 'react';
import { Appointment } from '../types';
import { convertDate, convertTime } from '../Utils';
import withRouter from '../withRouter';
import "react-datepicker/dist/react-datepicker.css";
import ConfirmAppointmentButton from './confirmBtn';
import AppointmentService from '../appointment.service';
import RescheduleDatePicker from './rescheduleBtn';

interface IState {
  appointments: Appointment[],
  loading: boolean,
  error: any,
  isSaving: boolean
}

class AppointmentsList extends Component<any, IState> {

  private _appointmentService = new AppointmentService();

  constructor(props: any) {
    super(props);
    this.state = { appointments: [], loading: true, error: null, isSaving: false };

    this.confirmAppointment = this.confirmAppointment.bind(this);
    this.saveRescheduledDate = this.saveRescheduledDate.bind(this);
    this.setRescheduleDate = this.setRescheduleDate.bind(this);
    this.clearRescheduledDate = this.clearRescheduledDate.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const response = await this._appointmentService.getAppointmentsData();
    if (response?.status === 200) {
      const data: Appointment[] = await response.json();

      data.sort((a: Appointment, b: Appointment) => a.requestedDateTimeOffset > b.requestedDateTimeOffset ? 1 : -1);
      this.setState({ appointments: data, loading: false });
    }
    else {
      console.log(response);
      this.setState({ loading: false, error: response?.statusText });
    }  
  }

  appointmentDetails(id: number): void {
    let path = '/appointment/' + id;
    this.props.navigate(path);
  }

  async confirmAppointment(apptIndex: number): Promise<void> {
    if (this.state.isSaving) return;
    this.setState({isSaving: true });

    const newAppt = await this._appointmentService.confirmAppointment(this.state.appointments[apptIndex]) as Appointment;

    const newAppointments = [...this.state.appointments];
    newAppointments[apptIndex] = newAppt;
    this.setState({ appointments: newAppointments, isSaving: false });
  }

  async saveRescheduledDate(appt: Appointment) {
    if (this.state.isSaving) return;
    this.setState({ isSaving: true });
    appt = await this._appointmentService.saveRescheduledDate(appt);
    this.setState({appointments: this.state.appointments, isSaving: false });
  }

  setRescheduleDate(date: Date, appt: Appointment) {
    appt = this._appointmentService.setRescheduleDate(date, appt);
    this.setState({ appointments: this.state.appointments });
  }

  clearRescheduledDate(appt: Appointment) {
    appt = this._appointmentService.clearRescheduledDate(appt);
    this.setState({appointments: this.state.appointments});
  }
  
  renderAppointmentsTable(appointments: Appointment[]) {
    return (
      <div className="card">
        <div className="card-body ">
        <h4 className="card-title">Appointment Requests</h4>
        <p className="card-description">
            Confirm or Reschedule your upcoming appointments.
        </p>
        <div className="table-responsive">
        <table className="table">
            <thead>
            <tr>
                <th>Client</th>
                <th>Patient</th>
                <th>Appointment Type</th>
                <th>Appointment Date</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {appointments
                .map((appointment: Appointment, index) => this.renderAppointmentsRow(appointment, index))
            }
            </tbody>
          </table>
          </div>
          </div>
      </div>
    );
  }

  renderAppointmentsRow(appointment: Appointment, apptIndex: number) {
     const displayDateTime = (appointment.rescheduledDateTimeSaved && appointment.rescheduledDateTime) 
                              ? appointment.rescheduledDateTime 
                              : appointment.requestedDateTimeOffset;

    return (
      <tr key={appointment.appointmentId} 
          className={(appointment.rescheduledDateTimeSaved) 
                      ? 'reschedule' 
                      : (appointment.appointmentConfirmed) ? 'accepted' : ''}>
        <td>{appointment.user.firstName} {appointment.user.lastName}</td>
        <td>{appointment.animal.firstName}</td>
        <td>{appointment.appointmentType}</td>
        <td>
          <div><span>{(appointment.rescheduledDateTimeSaved) 
                        ? 'Reschedule Requested' 
                        : (appointment.appointmentConfirmed) ? 'Confirmed' : 'Requested'}</span></div>
            {convertDate(new Date(displayDateTime))} &nbsp;
            {convertTime(new Date(displayDateTime))}
        </td>
        <td className='text-end appt-actions'>
          <button className="btn btn-sm btn-primary mx-1" onClick={() => this.appointmentDetails(appointment.appointmentId)}>Details</button>
          <ConfirmAppointmentButton 
              appointment={appointment}
              apptIndex={apptIndex}
              onUpdate={this.confirmAppointment} />
          <RescheduleDatePicker
              appointment={appointment}
              onSetReschedule={this.setRescheduleDate}
              onSaveReschedule={this.saveRescheduledDate}
              onClearReschedule={this.clearRescheduledDate} />
        </td>
      </tr>
    )
  }

  render() {
    if (this.state.error !== null) {
      return(
        <div>
          Error loading page.
        </div>
      )
    }

    let appointmentList = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAppointmentsTable(this.state.appointments);
    return (
      <div className='mb-5'>
        {appointmentList}
      </div>
    )
  }
}
export default withRouter(AppointmentsList);