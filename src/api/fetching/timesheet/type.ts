export type Timesheet = {
  id: number;
  userId: number;
  date: string;
  pit: string;
  disposal: string;
  location: string;
  fuel: string;
  fuelhm: string;
  postscript: string | null;
  stopOperation: string | null;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
    name: string;
    phoneNumber: string;
    imageUrl: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  Timesheets: {
    id: number;
    idLocation: number;
    timeTs: string;
    material: string;
    remark: string;
    activityCode: string;
    delayCode: string;
    idleCode: string;
    repairCode: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
