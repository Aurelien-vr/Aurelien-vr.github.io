const form = document.querySelector("#login-form");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#login-error");
const privateContent = document.querySelector("#private-content");

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
  const salt = fromBase64(encryptedContent.salt);
  const iv = fromBase64(encryptedContent.iv);
  const ciphertext = fromBase64(encryptedContent.ciphertext);
  const key = await deriveKey(password, salt);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return decoder.decode(plaintext);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;

  try {
    privateContent.innerHTML = await decryptContent(passwordInput.value);
    form.hidden = true;
    privateContent.hidden = false;
  } catch {
    errorMessage.hidden = false;
    passwordInput.select();
  }
});
