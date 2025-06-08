export function addressConcat(
  addressLine1: string,
  addressLine2: string | undefined,
  addressLine3: string | undefined,
  city: string,
  state: string,
  pincode: string
): string {
  // Validate inputs
  if (!addressLine1 || !city || !state || !pincode) {
    throw new Error("All address fields must be provided");
  }

  // Concatenate the address components
  return `${addressLine1}${addressLine2 ? `, ${addressLine2}` : ''}${addressLine3 ? `, ${addressLine3}` : ''}, ${city}, ${state} - ${pincode}`;
}