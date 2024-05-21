#!/usr/bin/env node

const { execSync } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const questions = [
  {
    type: 'confirm',
    name: 'includeLoginPage',
    message: 'Do you want to include a login page?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'includeHeader',
    message: 'Do you want to include a header?',
    default: true,
  }
];

inquirer.prompt(questions).then((answers) => {
  const projectName = 'my-app';
  console.log(chalk.blue('Creating React app...'));
  execSync(`npx create-react-app ${projectName}`, { stdio: 'inherit' });

  const config = {
    includeLoginPage: answers.includeLoginPage,
    includeHeader: answers.includeHeader,
  };

  fs.writeFileSync(`${projectName}/config.json`, JSON.stringify(config, null, 2));
  console.log(chalk.green('Configuration file created!'));

  process.chdir(projectName);

  const templateDir = path.join(__dirname, '../templates');

  copyTemplateFiles(templateDir, process.cwd(), config);

  console.log(chalk.green('Project setup complete!'));
});

function copyTemplateFiles(templateDir, targetDir, config) {
  const filesToCreate = [
    'index.js',
    'chakra-theme.js',
    'App.jsx',
    'pages/Home.jsx',
    'utils/hooks/useDeleteRequest.js',
    'utils/hooks/useGetRequest.js',
    'utils/hooks/usePostRequest.js',
    'utils/hooks/usePutRequest.js',
  ];

  if (config.includeLoginPage) {
    filesToCreate.push('pages/Login.jsx');
    filesToCreate.push('context/AuthContext.jsx');
    filesToCreate.push('components/puclicRoute.jsx');
    filesToCreate.push('components/privateRoute.jsx');
  }
  if (config.includeHeader) {
    filesToCreate.push('layout/Header.jsx');
    filesToCreate.push('layout/Footer.jsx');
  }

  filesToCreate.forEach((file) => {
    const filePath = path.join(templateDir, file);
    const targetPath = path.join(targetDir, 'src', file);
    const targetDirPath = path.dirname(targetPath);

    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }

    const template = fs.readFileSync(filePath, 'utf8');
    const content = ejs.render(template, config);

    fs.writeFileSync(targetPath, content);
  });
}
