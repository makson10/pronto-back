export type Profile = {
  profileId: number;
  name: string;
  description: string | null;
  createdAt: string;
  city: string | null;
  isVerifed: boolean;
  icon: string | null;
};

export interface ChangePasswordBody {
  userId: number;
  oldPassword: string;
  newPassword: string;
}
