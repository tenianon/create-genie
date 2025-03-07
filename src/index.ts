import path from 'path';
import prompts, { type PromptObject } from 'prompts';
import fs from 'fs';
import { language } from './i18n/index.ts';
import { fileURLToPath } from 'url';

const locale = Intl.DateTimeFormat().resolvedOptions().locale;

const currentDir = path.resolve('.');
const isRootDir = currentDir === path.parse(currentDir).root;
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 统一转换 __dirname

const templateDir = path.resolve(__dirname, '../src/template'); // 用 path.resolve 更语义化

const templates = fs
  .readdirSync(templateDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name); // 直接获取文件夹名称

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'projectName',
    message: language[locale]
      ? language[locale].qProjectName
      : language['en-US'].qProjectName,
    validate: async (value: string) => {
      if (value === '.') {
        if (!isRootDir) {
          return true;
        } else {
          return language[locale]
            ? language[locale].eProjectName1
            : language['en-US'].eProjectName1;
        }
      } else if (value.match(/^[a-zA-Z0-9-_]+$/)) {
        return true;
      } else {
        return language[locale]
          ? language[locale].eProjectName2
          : language['en-US'].eProjectName2;
      }
    },
  },
  {
    type: 'select',
    name: 'value',
    message: language[locale]
      ? language[locale].qProjectTemplate
      : language['en-US'].qProjectTemplate,
    choices: [],
    initial: 0,
  },
];

// (async () => {
//   const response = await prompts(questions);
// })();

// const templates = (() => {
//   try {
//     return fs
//       .readdirSync('/src/template', { withFileTypes: true })
//       .filter((dirent) => dirent.isDirectory())
//       .map((dirent) => ({
//         title: dirent.name,
//         value: dirent.name,
//       }));
//   } catch (error) {
//     // 如果找不到模板目录，尝试开发环境路径
//     const devTemplateDir = path.join(process.cwd(), 'src/template');
//     return fs
//       .readdirSync(devTemplateDir, { withFileTypes: true })
//       .filter((dirent) => dirent.isDirectory())
//       .map((dirent) => ({
//         title: dirent.name,
//         value: dirent.name,
//       }));
//   }
// })();

console.log(templateDir);
console.log(templates);
