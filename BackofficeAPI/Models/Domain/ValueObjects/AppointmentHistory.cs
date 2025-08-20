using System;
using System.Collections.Generic;
using Backoffice.Models.Domain.Roots;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class AppointmentHistory
    {
        public List<Appointment> Appointments { get; private set; }

        public AppointmentHistory()
        {
            Appointments = new List<Appointment>();
        }

        public void AddAppointment(Appointment appointment)
        {
            if (appointment == null)
                throw new ArgumentNullException(nameof(appointment));

            Appointments.Add(appointment);
        }
    }
}