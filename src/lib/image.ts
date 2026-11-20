export const MAX_IMAGE_SIZE = 1_000_000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function readImageFile(file: File): Promise<string> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return Promise.reject(new Error("Choose a JPG, PNG, or WebP image."));
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return Promise.reject(new Error("Images must be 1 MB or smaller."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("The selected image could not be read."));
      }
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("The selected image could not be read."));
    reader.onabort = () =>
      reject(new Error("Reading the selected image was canceled."));
    reader.readAsDataURL(file);
  });
}
