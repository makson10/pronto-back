export type UserProfile = {
  profileId: number;
  name: string;
  description: string | null;
  createdAt: string;
  city: string | null;
  verifedUser: boolean;
  icon: string | null;
};
