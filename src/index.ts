import path from 'path';
import { text, isCancel, cancel, select, spinner } from '@clack/prompts';
import { fileURLToPath } from 'url';
import { readdir, readFile, writeFile } from 'fs/promises';
import { getLanguage } from './utils/getLanguage.ts';
import { pathExists, copyDir } from './utils/fsOperate.ts';

const currentDir = path.resolve('.');
const isRootDir = currentDir === path.parse(currentDir).root;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.resolve(__dirname, '../src/template');

const templates = await readdir(templateDir, { withFileTypes: true }).then(
  (dirent) =>
    dirent
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        title: dirent.name,
        value: dirent.name,
      })),
);

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

  if (isCancel(template)) {
    cancel(language.projectNameCancelSelect);
    process.exit(0);
  }

  const projectName =
    _projectName === '.' ? path.basename(currentDir) : _projectName;

  const s = spinner();
  s.start(language.templateCopyStart);
  try {
    await copyDir(path.join(templateDir, template.toString()), projectName);

    const packageJsonPath = path.join(projectName, 'package.json');
    if (await pathExists(packageJsonPath)) {
      const packageJsonRaw = await readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonRaw);
      packageJson.name = projectName;
      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    s.stop(language.templateCopyCompleted);
  } catch (e) {
    s.stop(language.templateCopyError);
    process.exit(1);
  }
}

bootstrap();
