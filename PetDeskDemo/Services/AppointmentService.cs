using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PetDeskDemo.Models;

namespace PetDeskDemo.Services
{
    public class AppointmentService : IAppointmentService
    {
        HttpClient _client = new HttpClient();
        Appointment[] appointments = Array.Empty<Appointment>();

        public AppointmentService() 
        {
            var getAppts = GetAppointmentsAsync().Result;
            appointments = getAppts.ToArray();
        }

        public Task<Appointment[]> GetAppointments()
        {
            return Task.FromResult(appointments);
        }

        public Task<Appointment> GetAppointment(int id)
        {
            var appt = appointments.Where(a => a.appointmentId == id).FirstOrDefault();
            if (appt == null)
            {
                throw new Exception($"Appointment from id: {id} not found.");
            }
            return Task.FromResult(appt);
        }

        public Task<Appointment> SaveAppointment(int id, Appointment appointment)
        {
            foreach (var appt in appointments.Where(a => a.appointmentId == id))
            {
                appt.requestedDateTimeOffset = appointment.requestedDateTimeOffset;
                appt.appointmentConfirmed = appointment.appointmentConfirmed;
                appt.rescheduledDateTime = appointment.rescheduledDateTime;
                appt.rescheduledDateTimeSaved = appointment.rescheduledDateTimeSaved;
            }

            return Task.FromResult(appointment);
        }


        private async Task<IList<Appointment>> GetAppointmentsAsync()
        {
            string json = await _client.GetStringAsync("https://723fac0a-1bff-4a20-bdaa-c625eae11567.mock.pstmn.io/appointments");

            return JsonConvert.DeserializeObject<IList<Appointment>>(json);
        }

        /**
         * Methods that uses httpclient to fetch json on each request 
         */
        private async Task<Appointment[]> GetAppointmentsAsyncV2()
        {
            var getAppts = await GetAppointmentsAsync();
            return getAppts.ToArray();
        }

        public async Task<Appointment[]> GetAppointmentsV2()
        {
            var appts = await GetAppointmentsAsyncV2();
            return appts;
        }

        public async Task<Appointment> GetAppointmentV2(int id)
        {
            var getAppts = await GetAppointmentsAsyncV2();
            var appt = getAppts.Where(a => a.appointmentId == id).FirstOrDefault();
            if (appt == null)
            {
                throw new Exception($"Appointment from id: {id} not found.");
            }
            return appt;
        }
    }
}
