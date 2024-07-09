/*import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {

}*/


// components/appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  patient: string = 'Select';
  doctor: string = 'Select';
  appointmentDate: string = '';
  isEditing: boolean = false;
  editAppointmentId: string = '';
  DoctorsArray: any[] = [];
  PatientsArray: any[] = [];
  AppointmentsArray: any[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.getPatients().subscribe((res: any[]) => {
      this.PatientsArray = res;
    });
    this.apiService.getDoctors().subscribe((res: any[]) => {
      this.DoctorsArray = res;
    });
    this.apiService.getAppointments().subscribe((res: any[]) => {
      this.AppointmentsArray = res;
    });
  }

  clear(): void {
    this.patient = 'Select';
    this.doctor = 'Select';
    this.appointmentDate = '';
  }

  onEditAppointment(id: string): void {
    const appointment = this.AppointmentsArray.find(app => app._id === id);
    if (appointment) {
      this.patient = appointment.patient;
      this.doctor = appointment.doctor;
      this.appointmentDate = new Date(appointment.appointmentDate).toISOString().slice(0, 10);
      this.isEditing = true;
      this.editAppointmentId = id;
    }
  }

  onDeleteAppointment(id: string): void {
    this.apiService.deleteAppointment(id).subscribe(() => {
      this.AppointmentsArray = this.AppointmentsArray.filter(appointment => appointment._id !== id);
      this.toastr.success('Appointment deleted successfully!', 'Success!');
    });
  }

  onAddClick(): void {
    const data = {
      patient: this.patient,
      doctor: this.doctor,
      appointmentDate: this.appointmentDate
    };

    this.apiService.addAppointment(data).subscribe((res: any) => {
      this.AppointmentsArray.push(res);
      this.clear();
      this.toastr.success('New Appointment added successfully', 'Success!');
    });
  }

  onUpdateClick(): void {
    const data = {
      patient: this.patient,
      doctor: this.doctor,
      appointmentDate: this.appointmentDate
    };

    this.apiService.updateAppointment(this.editAppointmentId, data).subscribe((res: any) => {
      this.AppointmentsArray = this.AppointmentsArray.map(appointment => {
        if (appointment._id === this.editAppointmentId) {
          return res;
        }
        return appointment;
      });
      this.editAppointmentId = '';
      this.isEditing = false;
      this.toastr.success('Appointment details updated successfully', 'Success!');
      this.clear();
    });
  }
}



