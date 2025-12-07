export interface UsageStats {
  limit: number;
  used: number;
  remaining: number;
  lastDownloadAt: string | null;
  downloadsByResume: Record<string, number>;
}

export interface DownloadResponse {
  success: boolean;
  limit: number;
  remaining: number;
}

export interface AdminUserUsage {
  userId: string;
  name: string;
  email: string;
  role: string;
  used: number;
  limit: number;
  remaining: number;
  lastDownloadAt: string | null;
  createdAt: string;
}

export interface DownloadLog {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  resumeId: {
    _id: string;
    resumeName: string;
    selectedTemplateSlug: string;
  };
  templateSlug: string;
  downloadType: "pdf" | "docx" | "image";
  userAgent: string;
  ipAddress: string;
  createdAt: string;
}

export interface UserUsage {
  userId: string;
  name: string;
  email: string;
  role: string;
  used: number;
  limit: number;
  remaining: number;
  lastDownloadAt: string | null;
  downloadsByResume: Record<string, number>;
  createdAt: string;
}

export interface UsersUsageResponse {
  users: UserUsage[];
  total: number;
  page: number;
  limit: number;
}
