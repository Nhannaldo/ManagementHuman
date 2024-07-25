// Education
export interface IEducation {
  id?: number;
  status_id: boolean;
  StandardTrain: string;
  BasisTrain: string;
  FormTrain: string;
  DateStart: Date;
  DateEnd: Date;
  File: string;
  TypeTrain: string;
  SpecializedTrain: string;
  IndustryTrain: string;
  DegreeClassification: string;
  TitleTrain: string;
  EducationLevel: boolean;
  SentStudy: boolean;
}

export class Education {
  id?: number;
  status_id: boolean;
  StandardTrain: string;
  BasisTrain: string;
  FormTrain: string;
  DateStart: Date;
  DateEnd: Date;
  File: string;
  TypeTrain: string;
  SpecializedTrain: string;
  IndustryTrain: string;
  DegreeClassification: string;
  TitleTrain: string;
  EducationLevel: boolean;
  SentStudy: boolean;

  constructor() {
    this.status_id = true;
    this.StandardTrain = '';
    this.BasisTrain = '';
    this.FormTrain = '';
    this.DateStart = new Date();
    this.DateEnd = new Date();
    this.File = '';
    this.TypeTrain = '';
    this.SpecializedTrain = '';
    this.IndustryTrain = '';
    this.DegreeClassification = '';
    this.TitleTrain = '';
    this.EducationLevel = false;
    this.SentStudy = false;
  }
}

// Certificate

export interface ICertificate {
  id?: number;
  status_id: boolean;
  DegreeCertificate: string;
  TypeCertificate: string;
  FieldCertificate: string;
  InternationalCertificate: boolean;
  LevelCertificate: String;
  File: string;
  BasisTrain: string;
  LocationTrain: string;
  SentStudy: boolean;
  Score: number;
  Classification: string;
  DateCertificate: Date;
  DateStart: Date;
  DateEnd: Date;
}

export class Certificate {
  id?: number;
  status_id: boolean;
  DegreeCertificate: string;
  TypeCertificate: string;
  FieldCertificate: string;
  InternationalCertificate: boolean;
  LevelCertificate: String;
  File: string;
  BasisTrain: string;
  LocationTrain: string;
  SentStudy: boolean;
  Score: number;
  Classification: string;
  DateCertificate: Date;
  DateStart: Date;
  DateEnd: Date;

  constructor() {
    this.status_id = true;
    this.DegreeCertificate = '';
    this.TypeCertificate = '';
    this.FieldCertificate = '';
    this.InternationalCertificate = false;
    this.LevelCertificate = '';
    this.File = '';
    this.BasisTrain = '';
    this.LocationTrain = '';
    this.SentStudy = false;
    this.Score = 0;
    this.Classification = '';
    this.DateCertificate = new Date();
    this.DateStart = new Date();
    this.DateEnd = new Date();
  }
}

//Join Project

export interface IJoinProject {
  id?: number;
  status_id: boolean;
  ProductName: string;
  Description: string;
  DateStart: Date;
  DateEnd: Date;
}

export class JoinProject {
  id?: number;
  status_id: boolean;
  ProductName: string;
  Description: string;
  DateStart: Date;
  DateEnd: Date;

  constructor() {
    this.status_id = true;
    this.ProductName = '';
    this.Description = '';
    this.DateStart = new Date();
    this.DateEnd = new Date();
  }
}

//Training

export interface ITraining {
  id?: number;
  status_id: boolean;
  DateStart: Date;
  DateEnd: Date;
  Unit: string;
  JobTitle: string;
  CourseTrain: string;
  OrganizeForm: string;
  UnitTrain: string;
  Score: number;
  ResultTrain: string;
  IssueCertificate: boolean;
  CostTrain: number;
  TimeCommit: number;
  Status: string;
  Contract: boolean;
  ContentCommit: string;
  ResultSubject: string;
  TimeCommitRemain: number;
}

export class Training {
  id?: number;
  status_id: boolean;
  DateStart: Date;
  DateEnd: Date;
  Unit: string;
  JobTitle: string;
  CourseTrain: string;
  OrganizeForm: string;
  UnitTrain: string;
  Score: number;
  ResultTrain: string;
  IssueCertificate: boolean;
  CostTrain: number;
  TimeCommit: number;
  Status: string;
  Contract: boolean;
  ContentCommit: string;
  ResultSubject: string;
  TimeCommitRemain: number;

  constructor() {
    this.status_id = true;
    this.DateStart = new Date();
    this.DateEnd = new Date();
    this.Unit = '';
    this.JobTitle = '';
    this.CourseTrain = '';
    this.OrganizeForm = '';
    this.UnitTrain = '';
    this.Score = 0;
    this.ResultTrain = '';
    this.IssueCertificate = false;
    this.CostTrain = 0;
    this.TimeCommit = 0;
    this.Status = '';
    this.Contract = false;
    this.ContentCommit = '';
    this.ResultSubject = '';
    this.TimeCommitRemain = 0;
  }
}
