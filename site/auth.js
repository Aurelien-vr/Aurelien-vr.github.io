const decoder = new TextDecoder();

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: encryptedContent.iterations,
      hash: "SHA-256",
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

async function decryptContent(password) {
  const key = await deriveKey(password, fromBase64(encryptedContent.salt));
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(encryptedContent.iv) },
    key,
    fromBase64(encryptedContent.ciphertext),
  );
  return decoder.decode(plaintext);
}

const form = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#login-error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  try {
    const html = await decryptContent(passwordInput.value);
    document.open();
    document.write(html);
    document.close();
  } catch {
    errorMessage.hidden = false;
    passwordInput.select();
  }
});
