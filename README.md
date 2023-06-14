## PetDesk Demo App

This repository contains a Web App for the PetDesk assignment built with ASP.NET Core & React.



## Getting Started

### Prerequsites

- Visual Studio
- Node.js (This app has been tested with Node version 16.13.1 and higher. Check your version with `node -v`)

### App Setup
- Open Visual Studio and Clone the repository https://github.com/rhdalton/PetDeskDemo.git
- Open a command prompt and from the project root, navigate to `/PetDeskDemo/client-app` directory and run the command `npm install` to install dependencies.
- In the current `client-app` directory, create a new file named `.env.development.local`
- In this file, add these three lines and save:

      PORT=44427
      HTTPS=true
      BROWSER=none

### Running the App
- Set PetDesk Demo as your Startup project and run the solution in debug mode. Allow SSL certificates pop-ups that may appear.
- A new browser window will open showing this text:
  ![](https://github.com/rhdalton/PetDeskDemo/blob/master/PetDeskDemo/client-app/src/assets/petdeskdemo1.PNG?raw=true)
  - If you get a "Your connection is not private" error on Chrome, you can allow invalid https certs on localhost by entering this in your browser: `chrome://flags/#allow-insecure-localhost`
  Then **Enable** the option for "Allow invalid certificates for resources loaded from localhost" and restart the solution.
- Once the project finishes loading, this page will automatically direct to the PetDesk demo dashboard where you will see list of appointments.

### Feature Overview
- View latest appointments sorted by earliest appointments first.
- View details of each appointment.
- Confirm an appointment date.
- Reschedule a requested appointment date by selecting a new date & time.

## Functionality

### Backend
- The `AppointmentController.cs` contains three endpoints:
  - **[GET] `/appointment/api/allappointments`** Returns all appointments from the storage service.
  - **[GET] `/appointment/api/appointment/{id}`** Returns a single appointment with the matching appointment id key.
  - **[POST] `/appointment/api/appointment/{id}`** Saves changes to an appointment with matching appointment id key. Returns the saved appointment object.
- Three class models `AppointmentModel`, `ClientModel` and `PatientModel` represent the domain data.
- The `AppointmentService` to access the data from the storage source with `IAppointmentService` interface implimentation.

### Frontend

- **Pages:**
  - **Dashboard home** `/`
    - Table with all appointments
    - Action buttons to view details, confirm and reschedule appointments
  - **Appointment details** `/appointment/:id`
    - Details of a single appointment
    - Action buttons to confirm and reschedule appointment
- **Key Components:**
  - **AppointmentDashboard** `./dashboard.tsx` - Container where all page routes are shown.
  - **AppointmentsList** `./appointments.tsx` - Renders the list of appointments
  - **AppointmentDetails** `./appointmentdetails.tsx` - Renders details of a single appointment
  - **ConfirmAppointmentButton** `./confirmBtn.tsx` - Renders the Confirm appointment button on *AppointmentsList* and *AppointmentDetails*
  - **RescheduleDatePicker** `./rescheduleBtn.tsx` - Renders the Reschedule appointment button on *AppointmentsList* and *AppointmentDetails*
  - **AppointmentService** `./appointment.service.tsx` Contains the fetch requests that consume the API endpoints from backend