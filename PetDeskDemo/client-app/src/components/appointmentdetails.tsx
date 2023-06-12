import React, { Component } from 'react';
import AppointmentService from '../appointment.service';
import { Appointment } from '../types';
import { convertDate, convertTime } from '../Utils';
import withRouter from '../withRouter';
import ConfirmAppointmentButton from './confirmBtn';
import RescheduleDatePicker from './rescheduleBtn';

interface IState {
  appointment: any,
  error: any,
  loading: boolean,
  isSaving: boolean
}

class AppointmentDetails extends Component<any, IState> {
  static displayName = AppointmentDetails.name;

  private _appointmentService = new AppointmentService();

  constructor(props: any) {
    super(props);

    this.state = { appointment: null, error: null, loading: true, isSaving: false };
    this.confirmAppointment = this.confirmAppointment.bind(this);
    this.saveRescheduledDate = this.saveRescheduledDate.bind(this);
    this.setRescheduleDate = this.setRescheduleDate.bind(this);
    this.clearRescheduledDate = this.clearRescheduledDate.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const response = await this._appointmentService.getAppointmentData(this.props.params.id);
    if (response?.status === 200) {
      const data: Appointment = await response.json();
      this.setState({ appointment: data, loading: false });
    }
    else {
      console.log(response);
      this.setState({ loading: false, error: response?.statusText });
    }    
  }

  async confirmAppointment() {
    if (this.state.isSaving) return;
    this.setState({isSaving: true });

    const newAppt = await this._appointmentService.confirmAppointment(this.state.appointment) as Appointment;
    this.setState({ appointment: newAppt, isSaving: false });
  }

  async saveRescheduledDate(appt: Appointment) {
    if (this.state.isSaving) return;
    this.setState({ isSaving: true });
    appt = await this._appointmentService.saveRescheduledDate(appt);
    this.setState({appointment: appt, isSaving: false });
  }

  setRescheduleDate(date: Date, appt: Appointment) {
    appt = this._appointmentService.setRescheduleDate(date, appt);
    this.setState({ appointment: appt });
  }

  clearRescheduledDate(appt: Appointment) {
    appt = this._appointmentService.clearRescheduledDate(appt);
    this.setState({appointment: appt});
  }

  renderAppointmentDetails() {
    const displayDateTime = (this.state.appointment.rescheduledDateTimeSaved && this.state.appointment.rescheduledDateTime) 
                              ? this.state.appointment.rescheduledDateTime 
                              : this.state.appointment.requestedDateTimeOffset;
    return (
      <div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title title-text my-2">
            CLIENT:
          </div>
          <div className="col-sm-8 details-content my-2">
            <div>{this.state.appointment.user.firstName} {this.state.appointment.user.lastName}</div>
            <div><em>Additional details...</em></div>
          </div>
          <hr />
        </div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title title-text my-2">
            PATIENT:
          </div>
          <div className="col-sm-8 details-content my-2">
            <div>{this.state.appointment.animal.firstName}</div>
            <div>Species: {this.state.appointment.animal.species || 'unknown'}</div>
            <div>Breed: {this.state.appointment.animal.breed || 'unknown'}</div>
          </div>
          <hr />
        </div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title title-text my-2">
            APPOINTMENT:
          </div>
          <div className="col-sm-8 details-content my-2">
            <div>Type: {this.state.appointment.appointmentType}</div>
            {this.state.appointment.appointmentConfirmed
                ? <div className='confirmed'>Appointment Confirmed</div>
                : this.state.appointment.rescheduledDateTime
                ? <div className='requested'>Reschedule Requested</div>
                : null
            }
            <div>Date: {convertDate(new Date(displayDateTime))} &nbsp; 
              {convertTime(new Date(displayDateTime))}
            </div>
            <div className="mt-2 appt-actions">
              {!this.state.appointment.appointmentConfirmed &&
                <ConfirmAppointmentButton
                    appointment={this.state.appointment}
                    apptIndex={0}
                    onUpdate={this.confirmAppointment} />
              }
              <RescheduleDatePicker 
                appointment={this.state.appointment}
                onSetReschedule={this.setRescheduleDate}
                onSaveReschedule={this.saveRescheduledDate}
                onClearReschedule={this.clearRescheduledDate} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPastAppointments() {
    return (
      <div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title my-2">
            <div className="title-text">DATE:</div>
            <div>6/9/2018 &nbsp; 06:00 PM</div>
          </div>
          <div className="col-sm-8 details-title my-2">
            <div className="title-text">APPOINTMENT TYPE:</div>
            <div>Medication Refill</div>
            <div className="title-text mt-3">NOTES:</div>
            <div><em>Appointment visit notes...</em></div>
          </div>
          <hr />
        </div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title my-2">
            DATE:
            <div>1/19/2018 &nbsp; 01:00 PM</div>
          </div>
          <div className="col-sm-8 details-title my-2">
            <div className="title-text">APPOINTMENT TYPE:</div>
            <div>Medication Refill</div>
            <div className="title-text mt-3">NOTES:</div>
            <div><em>Appointment visit notes...</em></div>
          </div>
          <hr />
        </div>
        <div className="row gx-0">
          <div className="col-sm-4 details-title my-2">
            DATE:
            <div>10/4/2017 &nbsp; 10:00 AM</div>
          </div>
          <div className="col-sm-8 details-title my-2">
            <div className="title-text">APPOINTMENT TYPE:</div>
            <div>Medication Refill</div>
            <div className="title-text mt-3">NOTES:</div>
            <div><em>Appointment visit notes...</em></div>
          </div>
          <hr />
        </div>
      </div>
    )
  }
  
  render() {

    if (this.state.appointment === null && this.state.error === null) {
      return (
        <div>
          Loading appointment...
        </div>
      )
    }
    
    if (this.state.error !== null) {
      return (
        <div>
          Unable to find appointment with this Id. <a href={'/'}>Back to Appointments</a>
        </div>
      )
    }

    let appointmentDetails = this.renderAppointmentDetails();
    let pastAppointments = this.renderPastAppointments();

    return (
      <div>
        <div><a href={'/'}>&lt; Back to Appointments</a></div>
        <div className="row">
          <div className="col-lg-7 mb-4">
            <div className="card">
              <div className='card-header'><h3>Appointment Details</h3></div>
              <div className="card-body">
                {appointmentDetails}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card">
              <div className='card-header'><h3>Past Appointments</h3></div>
              <div className="card-body">
                {pastAppointments}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppointmentDetails);