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
import { getLanguage } from './utils/getLanguage.ts';

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

async function bootstrap() {
  const language = getLanguage();

  const _projectName = await text({
    message: language.projectNameInput,
    initialValue: 'project-test',
    validate: (value: string) => {
      if (value === '.' && isRootDir) {
        return language.projectNameErrorPath;
      } else if (value !== '.' && !value.match(/^[a-zA-Z0-9-_]+$/)) {
        return language.projectNameErrorName;
      }
    },
  });

  if (isCancel(_projectName)) {
    cancel(language.projectNameCancelInput);
    process.exit(0);
  }

  const template = await select({
    message: language.projectTemplateSelect,
    options: templates,
  });

  if (isCancel(_projectName)) {
    cancel(language.projectNameCancelInput);
    process.exit(0);
  }

  const projectName =
    _projectName === '.' ? path.basename(currentDir) : _projectName;

  const s = spinner();
  s.start(language.templateCopyStart);
  try {
    await fs.copy(`${templateDir}/${template.toString()}`, projectName);

    const packageJsonPath = path.join(projectName, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    s.stop(language.templateCopyCompleted);
  } catch (e) {
    s.stop(language.templateCopyError);
    process.exit(1);
  }
}

bootstrap();
