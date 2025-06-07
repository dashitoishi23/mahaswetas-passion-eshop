import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const constants = {
  categories: ["All", "Kurtis", "Dupattas", "Jewellery"],
  defaultCategoryFeatures : {
    "Kurtis" : [
      "Comfortable and breathable fabric",
      "Traditional embroidery and patterns",
      "Perfect fit for all body types",
      "Easy care and maintenance",
    ],
    "Dupattas" : [
      "Handwoven with traditional techniques",
      "Premium quality fabric",
      "Elegant and versatile design",
      "Perfect for both casual and formal occasions",
    ],
    "Jewellery" : [
      "Made from recycled and eco-friendly materials",
      "Unique handcrafted design",
      "Lightweight and comfortable to wear",
      "Sustainable and environmentally conscious",
    ],
  },
  orderStatuses: {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    cancelled: "Cancelled",
  },
}
