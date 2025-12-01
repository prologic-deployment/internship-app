
export interface Task {
  _id?: string;
  description: string;
  title: string;
  startDate: Date;
  endDate: Date;
  internshipOffer?: string;
  status?: string;
  isApproved?: boolean;
  assignedTo?: string;
  progress?:number;
}
