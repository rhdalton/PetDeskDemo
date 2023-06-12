namespace PetDeskDemo.Models
{
    public class Appointment
    {
        public int appointmentId { get; set; }

        public string appointmentType { get; set; }

        public DateTime createDateTime { get; set; }

        public DateTime requestedDateTimeOffset { get; set; }

        public int user_UserId { get; set; }

        public Client user { get; set; }

        public int animal_AnimalId { get; set; }

        public Patient animal { get; set; }

        public bool? appointmentConfirmed { get; set; }

        public DateTime? rescheduledDateTime { get; set; }

        public bool? rescheduledDateTimeSaved { get; set; }
    }

    // Enums for appointmentType
    public enum _appointmentType
    {
        Annual_Physical_Exam,
        Bath,
        Dental,
        Medication_Refill,
        Nail_Trim,
        Nail_Trim_Overnight,
        New_Client_Visit,
        Other,
        Sick_Pet_Exam,
        Surgery_Full_Cut,
        Trim_Cut,
        Vaccinations,
    }
}
