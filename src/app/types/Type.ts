export interface LoginRequest {
    emailAddress: string
    password: string
  }

export interface EmailVerificationRequest {
    emailAddress: string
}

export interface OtpValidationRequest {
  emailAddress: string | null
  verificationCode:string 
}

export interface ContactVerificationResponse {
  code:string
  message:string
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
    username:String
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

  export interface ProductOrder {
    productId: string | null;
    customerId: string;
    status: string | null;
    orderId: string | null;
    productCategory: string | null;
    vendorId: string | null;
    page: number;
    size: number;
  }

  export interface Products {
    vendorId: string | null;
    page: number;
    size: number;
    category: string | null;
    productId: string | null;
    status: string | null
  }

  export interface PageRequest {
    page: number;
    size: number;
  }

  export interface ProductRequest {
    page: number;
    size: number;
  }
  

  export interface ProductOrderStatistics {
    allOrdersCount: number
    processingOrdersCount:number
    cancelledOrdersCount:number
    failedOrdersCount:number
    completedOrdersCount:number
  }

  export interface ProductRequest {
    vendorId: string | null;
    page: number;
    size: number;
    category: string | null;
    productId: string | null;

    name: String
    code: String
    productImage: String
    amount: number
    quantity: number
    // fixedPrice: Boolean
    // country: String
    discount: number
    publishStatus: String
    shortDescription:String
    longDescription:String
    materialUsed:String
    readyIn:String
    sellingPrice:number
  }

  


