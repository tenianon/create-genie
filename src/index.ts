import path from 'path';
import prompts from 'prompts';
(async () => {
  const currentDir = path.resolve('.');
  const isRootDir = currentDir === path.parse(currentDir).root;

  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'project name?',
  });

  console.log(response);
})();
