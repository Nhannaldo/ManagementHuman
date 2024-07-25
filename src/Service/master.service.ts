import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Certificate,
  Education,
  ICertificate,
  IEducation,
  IJoinProject,
  ITraining,
  JoinProject,
  Training,
} from 'src/model/model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  api: string = 'http://localhost:5000';

  //Education

  getAllEducation(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(this.api + '/api/education');
  }

  addEducation(obj: Education): Observable<IEducation> {
    return this.http.post<IEducation>(this.api + '/api/education', obj);
  }

  updateEducation(education: IEducation): Observable<IEducation> {
    return this.http.put<IEducation>(
      this.api + `/api/education/${education.id}`,
      education
    );
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.put<any>(`${this.api}/api/education/delete/${id}`, {});
  }

  //Certificate

  getAllCertificate(): Observable<ICertificate[]> {
    return this.http.get<ICertificate[]>(this.api + '/api/certificate');
  }

  addCertificate(obj: Certificate): Observable<ICertificate> {
    return this.http.post<ICertificate>(this.api + '/api/certificate', obj);
  }

  updateCertificate(certificate: ICertificate): Observable<ICertificate> {
    return this.http.put<ICertificate>(
      this.api + `/api/certificate/${certificate.id}`,
      certificate
    );
  }

  deleteCertificate(id: number): Observable<any> {
    return this.http.put<any>(`${this.api}/api/certificate/delete/${id}`, {});
  }

  // Join Project
  getAllJoinProject(): Observable<IJoinProject[]> {
    return this.http.get<IJoinProject[]>(this.api + '/api/projects');
  }

  addJoinProject(obj: JoinProject): Observable<IJoinProject> {
    return this.http.post<IJoinProject>(this.api + '/api/projects', obj);
  }

  updateJoinProject(joinproject: IJoinProject): Observable<IJoinProject> {
    return this.http.put<IJoinProject>(
      `${this.api}/api/projects/${joinproject.id}`,
      joinproject
    );
  }

  deleteJoinProject(id: number): Observable<any> {
    return this.http.put<any>(`${this.api}/api/projects/delete/${id}`, {});
  }

  //Training
  getAllTraining(): Observable<ITraining[]> {
    return this.http.get<ITraining[]>(this.api + '/api/training');
  }

  addTraining(obj: Training): Observable<ITraining> {
    return this.http.post<ITraining>(this.api + '/api/training', obj);
  }

  updateTraining(training: ITraining): Observable<ITraining> {
    return this.http.put<ITraining>(
      this.api + `/api/training/${training.id}`,
      training
    );
  }

  deleteTraining(id: number): Observable<any> {
    return this.http.put<any>(`${this.api}/api/training/delete/${id}`, {});
  }
}
