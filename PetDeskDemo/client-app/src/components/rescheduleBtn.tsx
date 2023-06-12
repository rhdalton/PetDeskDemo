import { Component, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { Appointment } from "../types";

interface IProps {
  appointment: Appointment,
  onSetReschedule(date: Date, appt: Appointment): void,
  onSaveReschedule(appt: Appointment): void,
  onClearReschedule(appt: Appointment): void
}

export default class RescheduleDatePicker extends Component<IProps> {
  render() {
    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
      <button className="btn btn-sm btn-primary mx-1" onClick={onClick}>
        Reschedule
      </button>
    ));

    return (
      <ReactDatePicker
        selected={(this.props.appointment.rescheduledDateTime) 
          ? new Date(this.props.appointment.rescheduledDateTime) 
          : new Date(this.props.appointment.requestedDateTimeOffset)}
        onChange={(date: Date) => this.props.onSetReschedule(date, this.props.appointment)}
        onCalendarClose={() => this.props.onSaveReschedule(this.props.appointment)}
        onClickOutside={() => this.props.onClearReschedule(this.props.appointment)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Time"
        customInput={<ExampleCustomInput />}
        withPortal
        />
    )
  }
}
