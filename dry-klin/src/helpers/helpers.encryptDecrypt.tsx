import CryptoJS from "crypto-js";

/**
 * Gets a secret key for encryption/decryption
 * Uses only stable browser properties to ensure consistency
 */
const getSecretKey = (): string => {
  const fixedSecret = "NCEX_SECURE_KEY_PREFIX";
  // Use only stable browser properties that don't change between sessions
  const browserFingerprint = navigator.userAgent;

  // Create a hash of the combined values
  return CryptoJS.SHA256(fixedSecret + browserFingerprint).toString();
};

/**
 * Encrypts a string using AES encryption
 * @param data - The string to encrypt
 * @returns Encrypted string or empty string if encryption fails
 */
export const encrypt = (data: string | undefined): string => {
  if (!data) return "";

  try {
    const secretKey = getSecretKey();
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();

    // Verify we got a valid encrypted string
    if (!encrypted) {
      throw new Error("Encryption produced empty result");
    }

    return encrypted;
  } catch (error) {
    return "";
  }
};

/**
 * Decrypts an encrypted string using AES decryption
 * @param encryptedData - The encrypted string to decrypt
 * @returns Decrypted string or empty string if decryption fails
 */
export const decrypt = (encryptedData: string | undefined): string => {
  if (!encryptedData) return "";

  try {
    const secretKey = getSecretKey();

    // Attempt to decrypt
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);

    // Convert to UTF-8 string
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    // Check if decryption actually worked
    if (!decryptedText) {
      throw new Error(
        "Decryption resulted in empty string - data may be corrupted or encrypted with different key"
      );
    }

    // Additional validation: check if the result contains valid characters
    if (decryptedText.includes("\0") || decryptedText.length === 0) {
      throw new Error("Decrypted data contains invalid characters");
    }

    return decryptedText;
  } catch (error) {
    return "";
  }
};

/**
 * Utility function to test if data can be successfully decrypted
 * Useful for validating stored encrypted data
 */
export const canDecrypt = (encryptedData: string | undefined): boolean => {
  if (!encryptedData) return false;

  try {
    const result = decrypt(encryptedData);
    return result.length > 0;
  } catch {
    return false;
  }
};

/**
 * Utility function to clear any potentially corrupted encrypted data
 * Call this if you suspect the encryption key has changed
 */
export const clearEncryptedStorage = (storageKeys: string[] = []): void => {
  storageKeys.forEach((key) => {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch (error) {
      // Silently fail to clear storage
    }
  });
};
