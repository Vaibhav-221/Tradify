import type { Condition, Listing, ListingType } from "./types";

export const LISTING_CATEGORIES = [
  "Electronics",
  "Books & Notes",
  "Fashion",
  "Hostel Essentials",
  "Stationery",
  "Sports",
  "Other",
] as const;

export const CONDITIONS: { value: Condition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export function formatPrice(listing: Listing): string {
  if (listing.type === "giveaway") return "Free";
  if (listing.type === "exchange") return "Exchange";
  if (listing.price === undefined) return "Contact for price";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(listing.price);
}

export function getListingTypeLabel(type: ListingType): string {
  switch (type) {
    case "giveaway":
      return "Give Away";
    case "exchange":
      return "Exchange";
    default:
      return "For Sale";
  }
}

export function getConditionLabel(condition: Condition): string {
  return CONDITIONS.find((option) => option.value === condition)?.label ?? condition;
}
