export type ListingType = "sell" | "giveaway" | "exchange";

export type ListingStatus = "available" | "sold" | "reserved";

export type Condition = "new" | "like-new" | "good" | "fair";

export type ReportReason =
  | "spam"
  | "fake"
  | "prohibited"
  | "misleading"
  | "other";

export type ListingActionKind =
  | "reservation"
  | "giveaway-request"
  | "exchange-proposal";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  branch: string;
  year: string;
  hostel: string;
  bio?: string;
  profileImage?: string;
  loggedIn: true;
}

export interface Listing {
  id: string;
  sellerId: string;
  sellerName?: string;
  sellerBranch?: string;
  title: string;
  description: string;
  category: string;
  type: ListingType;
  price?: number;
  exchangeFor?: string;
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

export interface ListingAction {
  id: string;
  listingId: string;
  userId: string;
  kind: ListingActionKind;
  message?: string;
  createdAt: string;
}

export interface ListingReport {
  id: string;
  listingId: string;
  reporterId: string;
  reason: ReportReason;
  description?: string;
  createdAt: string;
}
