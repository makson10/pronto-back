export type Profile = {
  profileId: number;
  name: string;
  description: string | null;
  createdAt: string;
  city: string | null;
  isVerifed: boolean;
  icon: string | null;
};

export interface NewProfileData {
  dateOfBirth: string;
  description: string;
  city: string;
}
