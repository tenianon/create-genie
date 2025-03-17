import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import enUS from '../locales/en-US.json'

function getLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';
}

export function getLanguage(): typeof enUS {
  const locale = getLocale();

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const localesRoot = path.resolve(__dirname, '../../src/locales');
  const languageFilePath = path.resolve(localesRoot, `${locale}.json`);

  const defaultFilePath = path.resolve(localesRoot, 'en-US.json');

  try {
    if (fs.pathExistsSync(languageFilePath)) {
      return fs.readJSONSync(languageFilePath);
    }

    if (fs.pathExistsSync(defaultFilePath)) {
      return fs.readJSONSync(defaultFilePath);
    }

    throw new Error('No valid language files found');
  } catch (error) {
    throw new Error(`Language file loading failed: ${error.message}`);
  }
}
