export interface LoginRequest {
    emailAddress: string
    password: string
  }
  
 export interface LoginResponse {
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
  }

  export interface CustomerSignUpRequest {
    emailAddress: String
    password: String
    firstName: String
    lastName: String
    phoneNumber: String
    country: String
  }

  export interface CustomerSignUpResponse {
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
  }