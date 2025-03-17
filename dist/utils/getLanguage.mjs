import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

function getLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
}
function getLanguage() {
  const locale = getLocale();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const localesRoot = path.resolve(__dirname, "../../src/locales");
  const languageFilePath = path.resolve(localesRoot, `${locale}.json`);
  const defaultFilePath = path.resolve(localesRoot, "en-US.json");
  try {
    if (fs.existsSync(languageFilePath)) {
      const content = fs.readFileSync(languageFilePath, "utf-8");
      return JSON.parse(content);
    }
    if (fs.existsSync(defaultFilePath)) {
      const content = fs.readFileSync(defaultFilePath, "utf-8");
      return JSON.parse(content);
    }
    throw new Error("No valid language files found");
  } catch (error) {
    throw new Error(`Language file loading failed: ${error.message}`);
  }
}

export { getLanguage };
