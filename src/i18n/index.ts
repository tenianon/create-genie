interface Languages {
  [key: string]: {
    [key: string]: string;
  };
}

export const languages: Languages = {
  'en-US': {
    'projectName.tip.input': 'Please enter project name',
    'projectName.cancel.input': 'Cancel input',
    'projectName.error.path': 'Invalid directory path',
    'projectName.error.name':
      'Only valid project names with letters, numbers, dashes, or underscores are supported',

    'projectTemplate.tip.select': 'Please choose template',
    'projectName.cancel.select': 'Cancel choose',
  },
  'zh-CN': {
    'projectName.tip.input': '请输入项目名称',
    'projectName.cancel.input': '取消输入',
    'projectName.error.path': '无效的目录路径',
    'projectName.error.name':
      '只支持字母、数字、破折号或下划线输入有效的项目名称',
    'projectTemplate.tip.select': '请选择模板',
    'projectName.cancel.select': '取消选择',
  },
};
