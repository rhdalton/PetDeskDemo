import React, { Component } from 'react';
import { Appointment } from '../types';

interface IProps {
  appointment: Appointment,
  apptIndex: number,
  onUpdate(index: number): void
}

export default class ConfirmAppointmentButton extends Component<IProps> {
  render() {
    return  (
      <button className="confirmbtn btn btn-sm btn-primary mx-1" 
              style={{ visibility: (this.props.appointment.appointmentConfirmed ? 'hidden' : 'visible' )}}
              onClick={() => this.props.onUpdate(this.props.apptIndex)}>Confirm</button>
    )
  }
}