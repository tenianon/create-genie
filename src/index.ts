import path from 'path';
import prompts, { type PromptObject } from 'prompts';
import fs from 'fs';
import { language } from './i18n/index.ts';

const locale = Intl.DateTimeFormat().resolvedOptions().locale;

const currentDir = path.resolve('.');

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const isRootDir = currentDir === path.parse(currentDir).root;

function getFirstLevelFolders(dir: string) {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(dir)) {
      throw new Error(`Directory does not exist: ${dir}`);
    }

    // 读取目录并过滤出文件夹
    const folders = fs.readdirSync(dir)
      .filter(item => {
        const fullPath = path.join(dir, item);
        return fs.statSync(fullPath).isDirectory();
      });

    return folders
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}


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


//   console.log(response);

// })();


console.log(`${__dirname}/template`)
