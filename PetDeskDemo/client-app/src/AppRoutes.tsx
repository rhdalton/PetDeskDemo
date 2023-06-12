import AppointmentDetails from "./components/appointmentdetails";
import AppointmentsList from "./components/appointments";

const AppRoutes = [
  {
    index: true,
    element: <AppointmentsList />
  },
  {
    path: '/appointment/:id',
    element: <AppointmentDetails />
  },
];

export default AppRoutes;