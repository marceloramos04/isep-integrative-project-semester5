namespace Backoffice;

using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Repositories.Staff;
using Backoffice.Repositories.User;
using Backoffice.Services.Staff;

public class Bootstrap{

    private readonly BackofficeContext _context;
    //private readonly RequestDelegate _next;

    public Bootstrap(BackofficeContext context){
        _context=context;
        //_next=next;
    }

    // public async Task InvokeAsync(HttpContext context)
    // {
    //     SetInitialData();
    //     await _next(context);
    // }

    public void SetInitialData(){

        string staffEmail="john@test.com";
        string patientEmail1="jane@test.com";
        string patientEmail2="max@test.com";

        User user1=new User(new Username("johndoe"), Role.Doctor, new Email(staffEmail));
        User user2=new User(new Username("janedoe"), Role.Patient, new Email(patientEmail1));
        User user3=new User(new Username("maxdoe"), Role.Patient, new Email(patientEmail2));
        user1=_context.Users.Add(user1).Entity;
        user2=_context.Users.Add(user2).Entity;
        user3=_context.Users.Add(user3).Entity;


        Specialization s1=new Specialization("394701000000116", "Obstetrics and Gynecology", "Obstetrics and gynecology");
        Specialization s2=new Specialization("394701000000109", "Family medicine", "Family medicine");

        //string staffId="O2024000001";
        StaffId staffId=new StaffService(new StaffRepository(_context), new UserRepository(_context)).GenerateStaffId(user1.Email.Address);
        
        Staff staff1=new Staff(staffId, new FirstName("John"), new LastName("Doe"), new LicenseNumber("L2024000001"), "394701000000109", new Email(staffEmail), new PhoneNumber("1111111"));
        // staff1.UserId=user1.Id;

        TimeSlot ts1=new TimeSlot(new TimeOnly(8, 0), new TimeOnly(12, 0));
        TimeSlot ts2=new TimeSlot(new TimeOnly(14, 0), new TimeOnly(18, 0));
        staff1.AvailabilitySlots= new List<TimeSlot>();
        staff1.AvailabilitySlots.Add(ts1);
        staff1.AvailabilitySlots.Add(ts2);

        staff1= _context.Add(staff1).Entity;
        //staff1= new StaffRepository(_context).Add(staff1).Result;




        Patient patient1=new Patient(00000001, new PhoneNumber("2222222"), new Email(patientEmail1), new PhoneNumber("0000000"),  new DateOfBirth(new DateTime(1990, 1, 1)), new Gender("female"), new LastName("Doe"), new FirstName("Jane"));
        patient1.UserId=user2.Id;

        Patient patient2=new Patient(00000002, new PhoneNumber("3333333"), new Email(patientEmail2), new PhoneNumber("0000000"),  new DateOfBirth(new DateTime(1990, 1, 1)), new Gender("male"), new LastName("Doe"), new FirstName("Max"));
        patient2.UserId=user3.Id;
        
        patient1= _context.Patients.Add(patient1).Entity;
        patient2= _context.Patients.Add(patient2).Entity;



        // Equipment e1=new Equipment(new Designation("Surgical Table"));
        // Equipment e2=new Equipment(new Designation("Surgical Light"));

        SurgeryRoom room1 =new SurgeryRoom(new RoomNumber("1"), new RoomStatus("available"), new RoomType("Operating Room"), new RoomCapacity(10));
        room1= _context.SurgeryRooms.Add(room1).Entity;
        




        OperationType ot1=new OperationType(new Designation("ACL Reconstruction"), new DurationInMinutes(135));
        ot1.AddRequiredStaff(new RequiredStaff(Role.Doctor, s1, 1));
        ot1.AddRequiredStaff(new RequiredStaff(Role.Nurse, s1, 1));
        ot1.AddRequiredStaff(new RequiredStaff(Role.Nurse, s2, 2));

        OperationType ot2=new OperationType(new Designation("Other Operation Type"), new DurationInMinutes(135));
        ot2.AddRequiredStaff(new RequiredStaff(Role.Doctor, s2, 1));
        ot2.AddRequiredStaff(new RequiredStaff(Role.Nurse, s2, 1));
        ot2.AddRequiredStaff(new RequiredStaff(Role.Nurse, s1, 1));

        OperationType ot3=new OperationType(new Designation("Inactive Operation Type"), new DurationInMinutes(135));
        ot3.AddRequiredStaff(new RequiredStaff(Role.Doctor, s2, 1));
        ot3.AddRequiredStaff(new RequiredStaff(Role.Nurse, s2, 1));
        ot3.AddRequiredStaff(new RequiredStaff(Role.Nurse, s1, 1));
        ot3.status=OperationType.INACTIVE;

        ot1= _context.OperationTypes.Add(ot1).Entity;
        ot2= _context.OperationTypes.Add(ot2).Entity;
        ot3= _context.OperationTypes.Add(ot3).Entity;





        OperationRequest request1=new OperationRequest(patient1.MedicalRecordNumber, staff1.Id, ot1.Id, new Priority(Priority.ELECTIVE), new Deadline(DateTime.Today.AddDays(7)));
        OperationRequest request2=new OperationRequest(patient2.MedicalRecordNumber, staff1.Id, ot1.Id, new Priority(Priority.ELECTIVE), new Deadline(DateTime.Today.AddDays(7)));
        OperationRequest request3=new OperationRequest(patient2.MedicalRecordNumber, staff1.Id, ot2.Id, new Priority(Priority.URGENT), new Deadline(DateTime.Today.AddDays(3)));
        request1= _context.OperationRequests.Add(request1).Entity;
        request2= _context.OperationRequests.Add(request2).Entity;
        request3= _context.OperationRequests.Add(request3).Entity;





        Appointment appoint1=new Appointment(request1.Id, room1.Id, new AppointmentStatus("scheduled"), new Timestamp(DateTime.Now.AddDays(1)));
        appoint1= _context.Appointments.Add(appoint1).Entity;





        _context.SaveChangesAsync();
    }
}