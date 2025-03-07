import path from 'path';
import {
  text,
  intro,
  outro,
  isCancel,
  cancel,
  confirm,
  select,
  spinner,
} from '@clack/prompts';

import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { languages } from './i18n/index.ts';

const locale = Intl.DateTimeFormat().resolvedOptions().locale;

const currentDir = path.resolve('.');
const isRootDir = currentDir === path.parse(currentDir).root;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const templateDir = path.resolve(__dirname, '../src/template');

const templates = fs
  .readdirSync(templateDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => ({
    title: dirent.name,
    value: dirent.name,
  }));

function getMessage(key: keyof (typeof languages)['en-US']) {
  return languages[locale] ? languages[locale][key] : languages['en-US'][key];
}

(async () => {
  const _projectName = await text({
    message: getMessage('projectName.tip.input'),
    initialValue: 'project-test',
    validate: (value: string) => {
      if (value === '.' && isRootDir) {
        return getMessage('projectName.error.path');
      } else if (value !== '.' && !value.match(/^[a-zA-Z0-9-_]+$/)) {
        return getMessage('projectName.error.name');
      }
    },
  });

  if (isCancel(_projectName)) {
    cancel(getMessage('projectName.cancel.input'));
    process.exit(0);
  }

  const template = await select({
    message: getMessage('projectTemplate.tip.select'),
    options: templates,
  });

  if (isCancel(_projectName)) {
    cancel(getMessage('projectName.cancel.input'));
    process.exit(0);
  }

  const projectName =
    _projectName === '.' ? path.basename(currentDir) : _projectName;
    
  console.log(projectName, template);

  const s = spinner();
  s.start('开始拷贝');
  await fs.copy(`${templateDir}/template`, projectName);
  s.stop('拷贝完成');
})();
