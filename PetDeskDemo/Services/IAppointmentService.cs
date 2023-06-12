using PetDeskDemo.Models;

namespace PetDeskDemo.Services
{
    public interface IAppointmentService
    {
        Task<Appointment[]> GetAppointments();

        Task<Appointment> GetAppointment(int id);

        Task<Appointment> SaveAppointment(int id, Appointment appointment);

        Task<Appointment[]> GetAppointmentsV2();

        Task<Appointment> GetAppointmentV2(int id);
    }
}
