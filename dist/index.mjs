import path from 'path';
import fs from 'fs';
import { language } from './i18n/index.mjs';
import { fileURLToPath } from 'url';

const locale = Intl.DateTimeFormat().resolvedOptions().locale;
const currentDir = path.resolve(".");
const isRootDir = currentDir === path.parse(currentDir).root;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.resolve(__dirname, "../src/template");
const templates = fs.readdirSync(templateDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
[
  {
    type: "text",
    name: "projectName",
    message: language[locale] ? language[locale].qProjectName : language["en-US"].qProjectName,
    validate: async (value) => {
      if (value === ".") {
        if (!isRootDir) {
          return true;
        } else {
          return language[locale] ? language[locale].eProjectName1 : language["en-US"].eProjectName1;
        }
      } else if (value.match(/^[a-zA-Z0-9-_]+$/)) {
        return true;
      } else {
        return language[locale] ? language[locale].eProjectName2 : language["en-US"].eProjectName2;
      }
    }
  },
  {
    type: "select",
    name: "value",
    message: language[locale] ? language[locale].qProjectTemplate : language["en-US"].qProjectTemplate,
    choices: [],
    initial: 0
  }
];
console.log(templateDir);
console.log(templates);
