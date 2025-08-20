using Backoffice.Models.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;

namespace Backoffice.Models
{
    public class BackofficeContext : DbContext
    {
        public BackofficeContext(DbContextOptions<BackofficeContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Staff> Staff { get; set; } = null!;
        public DbSet<OperationType> OperationTypes { get; set; } = null!;
        public DbSet<OperationRequest> OperationRequests { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;
        public DbSet<SurgeryRoom> SurgeryRooms { get; set; } = null!;
        public DbSet<AuditLog> AuditLogs { get; internal set; }
        public DbSet<Specialization> Specializations { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Username).IsUnique();

                entity.Property(e => e.Email).HasConversion(
                    v => v.Address,
                    v => new Email(v)
                ).HasColumnName("EmailAddress");

                entity.Property(e => e.Role).HasConversion(
                    v => v.Name,
                    v => new Role(v)
                ).HasColumnName("RoleName");

                entity.Property(e => e.Username).HasConversion(
                    v => v.Value,
                    v => new Username(v)
                ).HasColumnName("Username");

            });



            modelBuilder.Entity<Staff>(entity =>
            {
                entity.HasKey(e => e.Id);

                // entity.HasOne(e => e.User).WithOne(e => (Staff)e.UserProfile).HasForeignKey<Staff>(e => e.UserId);

                entity.Property(e => e.Id)
                    .HasConversion(
                        v => v.Value,
                        v => new StaffId(v));

                entity.Property(e => e.FirstName)
                    .HasConversion(
                        v => v.Value,
                        v => new FirstName(v));

                entity.Property(e => e.LastName)
                    .HasConversion(
                        v => v.Value,
                        v => new LastName(v));

                // entity.OwnsOne(e => e.FullName, fullName =>
                // {
                //     fullName.Property(f => f.FirstName).HasConversion(
                //         v => v.Value,
                //         v => new FirstName(v)
                //     );
                //     fullName.Property(f => f.LastName).HasConversion(
                //         v => v.Value,
                //         v => new LastName(v)
                //     );

                // });
              
            
                entity.Property(e => e.LicenseNumber)
                    .HasConversion(
                        v => v.Value,
                        v => new LicenseNumber(v));

                entity.Property(e => e.Email)
                    .HasConversion(
                        v => v.Address,
                        v => new Email(v));

                entity.Property(e => e.PhoneNumber)
                    .HasConversion(
                        v => v.Number,
                        v => new PhoneNumber(v));

                entity.Property(e => e.Status)
                    .HasConversion(
                        v => v.IsActive,
                        v => new StaffStatus(v));


                entity.OwnsMany(e => e.AvailabilitySlots, slot =>
                {
                    slot.Property(e => e.Start).HasConversion(
                        v => v.ToString("HH:mm"),
                        v => TimeOnly.Parse(v)
                    );
                    slot.Property(e => e.End).HasConversion(
                        v => v.ToString("HH:mm"),
                        v => TimeOnly.Parse(v)
                    );
                });
            });

            // modelBuilder.Entity<StaffData>(s => {
            //     s.HasKey(e => e.Id);
            //     s.OwnsMany(staff => staff.AvailabilitySlots);
            // });






            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.MedicalRecordNumber);

                entity.HasOne(e => e.User).WithOne(e => (Patient)e.UserProfile).HasForeignKey<Patient>(e => e.UserId);

                entity.Property(e => e.MedicalRecordNumber)
                    .HasConversion(
                        v => v.Value,
                        v => new MedicalRecordNumber(v));

                entity.Property(e => e.FirstName)
                    .HasConversion(
                        v => v.Value,
                        v => new FirstName(v));

                entity.Property(e => e.LastName)
                    .HasConversion(
                        v => v.Value,
                        v => new LastName(v));

                entity.OwnsOne(e => e.FullName, fullName =>
                {
                    fullName.Property(f => f.FirstName).HasConversion(
                        v => v.Value,
                        v => new FirstName(v)
                    );
                    fullName.Property(f => f.LastName).HasConversion(
                        v => v.Value,
                        v => new LastName(v)
                    );

                });

                entity.Property(e => e.Email)
                    .HasConversion(
                        v => v.Address,
                        v => new Email(v));

                entity.Property(e => e.PhoneNumber)
                    .HasConversion(
                        v => v.Number,
                        v => new PhoneNumber(v));

                entity.Property(e => e.EmergencyContact).HasConversion(
                    v => v.Number,
                    v => new PhoneNumber(v));

                entity.Property(e => e.DateOfBirth)
                    .HasConversion(
                        v => v.Value,
                        v => new DateOfBirth(v));

                // entity.OwnsMany(e => e.MedicalConditions, medicalCondition =>
                // {
                //     medicalCondition.Property(c => c.Name).HasConversion(
                //         v => v,
                //         v => v
                //     );
                //     medicalCondition.Property(c => c.Description).HasConversion(
                //         v => v,
                //         v => v
                //     );

                // });

                entity.OwnsMany(e => e.MedicalConditions);

                entity.Property(e => e.Gender).HasConversion(
                    v => v.Value,
                    v => new Gender(v));
            });



            modelBuilder.Entity<OperationType>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .HasConversion(
                        v => v.Value,
                        v => new Designation(v));

                entity.Property(e => e.EstimatedDuration)
                    .HasConversion(
                        v => v.Value,
                        v => new DurationInMinutes(v));

                // entity.OwnsMany(e => e.RequiredStaff).Property(e => e.Specialization).HasConversion(
                //     v => v.Name,
                //     v => new Specialization(v));
                entity.OwnsMany(
                    e => e.RequiredStaff, rs =>
                    {
                        rs.Property(r => r.Role).HasConversion(
                            v => v.Name,
                            v => new Role(v)
                        );
                    }
                );
            });



            modelBuilder.Entity<OperationRequest>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.HasOne(e => e.Patient).WithMany().HasForeignKey(e => e.PatientId);
                entity.HasOne(e => e.Doctor).WithMany().HasForeignKey(e => e.DoctorId);
                entity.HasOne(e => e.OperationType).WithMany().HasForeignKey(e => e.OperationTypeId);
                entity.Property(e => e.Priority).HasConversion(
                    v => v.Value,
                    v => new Priority(v));
                entity.Property(e => e.Deadline).HasConversion(
                    v => v.Value,
                    v => new Deadline(v));
            });




            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.HasOne(e => e.OperationRequest).WithOne().HasForeignKey<Appointment>(a => a.RequestId);
                entity.HasOne(e => e.Room).WithMany().HasForeignKey(e => e.RoomId);
                entity.Property(e => e.Status).HasConversion(
                    v => v.Value,
                    v => new AppointmentStatus(v));
                entity.Property(e => e.Timestamp).HasConversion(
                    v => v.Value,
                    v => new Timestamp(v));
            });



            modelBuilder.Entity<SurgeryRoom>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .HasConversion(v => v.Value, v => new RoomNumber(v));

                entity.Property(e => e.Status)
                    .HasConversion(
                        v => v.Value,
                        v => new RoomStatus(v));

                entity.Property(e => e.Type)
                    .HasConversion(
                        v => v.Value,
                        v => new RoomType(v));

                entity.Property(e => e.Capacity)
                    .HasConversion(
                        v => v.Value,
                        v => new RoomCapacity(v));

                entity.HasMany(e => e.AssignedEquipment).WithMany(e => e.rooms);
            });



            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .HasConversion(
                        v => v.Value,
                        v => new Designation(v));
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.HasKey(e => e.SpecializationCode);            
            });


            base.OnModelCreating(modelBuilder);
        }
    }
}
