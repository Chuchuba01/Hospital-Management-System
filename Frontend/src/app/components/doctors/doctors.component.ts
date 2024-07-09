
//components/doctors.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  name: string = '';
  speciality: string = 'Select';
  isEditing: boolean = false;
  editDoctorId: string = '';
  DoctorsArray: any[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.getDoctors().subscribe((res: any[]) => {
      this.DoctorsArray = res;
    });
  }

  clear(): void {
    this.name = '';
    this.speciality = 'Select';
  }

  onEditDoctor(id: string): void {
    const index = this.DoctorsArray.findIndex((doctor) => doctor._id === id);
    const doctor = this.DoctorsArray[index];
    this.name = doctor.name;
    this.speciality = doctor.speciality;
    this.isEditing = true;
    this.editDoctorId = id;
  }

  onDeleteDoctor(id: string): void {
    this.apiService.deleteDoctor(id).subscribe(() => {
      this.DoctorsArray = this.DoctorsArray.filter((doctor) => doctor._id !== id);
      this.toastr.success('Doctor deleted successfully!', 'Success!');
    });
  }

  onAddClick(): void {
    const data = {
      name: this.name,
      speciality: this.speciality
    };
    this.apiService.addDoctor(data).subscribe((res: any) => {
      this.DoctorsArray.push(res);
      this.clear();
      this.toastr.success('New Doctor added successfully', 'Success!');
    });
  }

  onUpdateClick(): void {
    const data = {
      name: this.name,
      speciality: this.speciality
    };
    this.apiService.updateDoctor(this.editDoctorId, data).subscribe((res: any) => {
      this.DoctorsArray = this.DoctorsArray.map((doctor) => {
        if (doctor._id === this.editDoctorId) {
          return res;
        }
        return doctor;
      });
      this.editDoctorId = '';
      this.isEditing = false;
      this.toastr.success('Doctor details updated successfully', 'Success!');
      this.clear();
    });
  }
}

