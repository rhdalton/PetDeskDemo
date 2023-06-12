import React, { Component } from 'react';

export default class AppointmentDashboard extends Component<any, any> {
  static displayName = AppointmentDashboard.name;

  render() {
    return (
      <div className="container">
        <h2 className='my-4'>PetDesk Appointments Dashboard</h2>
        {this.props.children}
      </div>
    )
  }
}
