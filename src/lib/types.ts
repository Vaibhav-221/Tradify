export type ListingType = "sell" | "giveaway" | "exchange";

export type ListingStatus = "available" | "sold" | "reserved";

export type Condition = "new" | "like-new" | "good" | "fair";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  studentId: string;
  branch: string;
  year: string;
  hostel: string;
  loggedIn: true;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  category: string;
  type: ListingType;
  price?: number;
  condition: Condition;
  hostel: string;
  image?: string;
  status: ListingStatus;
  createdAt: string;
}

export interface LookingForRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  budget?: number;
  hostel: string;
  createdAt: string;
}
