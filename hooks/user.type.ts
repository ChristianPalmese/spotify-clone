/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  aud: string;
  role: string;
  email: string | null;
  email_confirmed_at: string | null;
  phone: string | null;
  phone_confirmed_at: string | null;
  confirmed_at: string | null;
  last_sign_in_at: string | null;

  app_metadata: AppMetadata;
  user_metadata: Record<string, any>;

  identities: UserIdentity[];

  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface AppMetadata {
  provider?: string;
  providers?: string[];
  [key: string]: any; // eventuali altri campi
}

export interface UserIdentity {
  id: string;
  user_id: string;
  identity_data: Record<string, any>;
  provider: string;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string;
}