import path from 'path';
import fs from 'fs';
import { language } from './i18n/index.mjs';

const locale = Intl.DateTimeFormat().resolvedOptions().locale;
const currentDir = path.resolve(".");
const isRootDir = currentDir === path.parse(currentDir).root;
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
path.join(
  path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ""),
  "../template"
);
const templates = fs.readdirSync("/src/template", { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => ({
  title: dirent.name,
  value: dirent.name
}));
console.log(templates);
