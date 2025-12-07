export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

export interface Plan {
  _id: string;
  name: string;
  price: number;
  type: string;
  downloadLimit?: number;
  durationDays?: number;
  createdAt: string;
  updatedAt: string;
}
