import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const [password, inputPath = "private-content.html"] = process.argv.slice(2);

if (!password) {
  console.error("Usage: node generate-content.mjs '<password>' [content-file]");
  process.exit(1);
}

const plaintext = await readFile(inputPath);
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(password, salt, 310000, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);

const asBase64 = (value) => value.toString("base64");
const output = `const encryptedContent = ${JSON.stringify({
  iterations: 310000,
  salt: asBase64(salt),
  iv: asBase64(iv),
  ciphertext: asBase64(ciphertext),
})};
`;

await writeFile("content.enc.js", output);
console.log("Encrypted content written to content.enc.js");
