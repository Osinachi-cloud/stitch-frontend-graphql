export interface LoginRequest {
    email: string
    password: string
  }
  
 export interface LoginResponse {
    login: {
      customerId: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      phoneNumber: string;
      hasPin: boolean;
      saveCard: boolean;
      enablePush: boolean;
      tier: string;
      country: string;
      accessToken: string;
      refreshToken: string;
    };
  }