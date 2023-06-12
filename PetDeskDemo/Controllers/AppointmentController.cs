using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PetDeskDemo.Models;
using PetDeskDemo.Services;

namespace PetDeskDemo.Controllers
{
    [ApiController]
    [Route("appointment/api")]
    [EnableCors()]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(
            IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("allappointments")]
        public async Task<IActionResult> GetAppointments()
        {
            try
            {
                var appointments = await _appointmentService.GetAppointments();

                if (appointments == null)
                {
                    return BadRequest();
                }
                return Ok(appointments);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }            
        }

        [HttpGet("appointment/{id}")]
        public async Task<IActionResult> GetAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentService.GetAppointment(id);

                if (appointment == null)
                {
                    return NotFound();
                }
                return Ok(appointment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("appointment/{id}")]
        public async Task<IActionResult> SaveAppointment(int id, [FromBody] Appointment appointmentData)
        {
            try
            {
                var appointment = await _appointmentService.SaveAppointment(id, appointmentData);

                return Ok(appointment);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /**
         * Endpoints to simulate a database fetch instead of existing object
         */
        [HttpGet("allappointmentsV2")]
        public async Task<IActionResult> GetAppointmentsV2()
        {
            try
            {
                var appointments = await _appointmentService.GetAppointmentsV2();

                if (appointments == null)
                {
                    return BadRequest();
                }
                return Ok(appointments);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("appointmentV2/{id}")]
        public async Task<IActionResult> GetAppointmentV2(int id)
        {
            try
            {
                var appointment = await _appointmentService.GetAppointmentV2(id);

                if (appointment == null)
                {
                    return NotFound();
                }
                return Ok(appointment);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }            
        }
    }
}
