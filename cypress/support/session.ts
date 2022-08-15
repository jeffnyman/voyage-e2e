export interface Session {
  isAdmin: boolean;
  isImpersonated: boolean;
  isTenantAdmin: boolean;
  partnerName: string;
  passwordless: boolean;
  tenantId: number;
  token: string;
  userId: number;
}
