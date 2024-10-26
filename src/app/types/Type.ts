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
    roleName: String
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

  export interface ProductOrderRequest{
    status: string | null;
    orderId: string | null;
  }

  export interface Products {
    vendorId: string | null;
    page: number;
    size: number;
    category: string | null;
    productId: string | null;
    status: string | null
  }

  export interface ProductList {
    vendorId: string | null;
    page: number;
    size: number;
    category: string | null;
    productId: string | null;
    // status: string | null
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
    inTransitOrdersCount: number
    paymentCompletedCount: number
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

  export interface PaymentRequest{
    amount: number
    channel: string[]
    // reference: String
    productId:String
    productCategoryName: String
    vendorId: String
    narration: String
    quantity: number
    // orderId: String
    // customerId: String
  }

  export interface InitializeTransactionResponse {
    status: Boolean
    message: String
    data: InitializeTransactionData
}

export interface InitializeTransactionData {
    authorizationUrl: String
    accessCode: String
    reference: String
}

export interface BodyMeasurementRequest {
  shoulder?: number;
  midSleeveAtElbow?: number;
  longSleeveAtWrist?: number;
  thigh?: number;
  knee?: number;
  ankle?: number;
  trouserLength?: number;
  shortSleeveAtBiceps?: number;
  neck?: number;
  chest?: number;
  tummy?: number;
  hipWidth?: number;
  neckToHipLength?: number;
  bicepWidth?: number;
  elbowWidth?: number;
  wristWidth?: number;
  shortSleeveLength?: number;
  elbowLength?: number;
  longSleeveLength?: number;
  waist?: number;
  lowerHipWidth?: number;
  thighWidth?: number;
  kneeWidth?: number;
  ankleWidth?: number;
  kneeLength?: number;
  ankleLength?: number;
}

export interface CreateBodyMeasurementResponse {
  neck: number;
  chest: number;
  tummy: number;
  hipWidth: number;
  neckToHipLength: number;
  bicepWidth: number;
  elbowWidth: number;
  wristWidth: number;
  shortSleeveLength: number;
  elbowLength: number;
  longSleeveLength: number;
  waist: number;
  lowerHipWidth: number;
  thighWidth: number;
  kneeWidth: number;
  ankleWidth: number;
  kneeLength: number;
  ankleLength: number;
}

export interface BodyMeasurementObj {
  id: number;
  name: string;
  value: string
}


