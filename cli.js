#!/usr/bin/env node

const { program } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to execute a shell command
function executeCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`${errorMessage}:`, err);
  }
}

// Function to execute an app with an optional move to the default screen
function executeApp(appName, update) {
  console.log(`Running ${appName} application...`);
  execSync(`open -a "${appName}"`, (err) => {
    if (err) {
      console.error(`Error running ${appName}:`, err);
    }
  });
}

// Function to open a URL
function openUrl(url) {
  console.log(`Opening ${url}...`);
  executeCommand(`open ${url}`, `Error opening ${url}`);
}

// Function to create a project
async function createProject() {
  const inquirer = await import('inquirer');
  const { projectName, projectType } = await inquirer.default.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Select project type:',
      choices: ['React', 'Angular', 'Other'],
    },
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  if (projectType === 'React') {
    createReactProject(projectName, projectPath);
  } else if (projectType === 'Angular') {
    createAngularProject(projectName, projectPath);
  } else {
    createOtherProject(projectName, projectPath);
  }

  // Open the project in VS Code
  openInVSCode(projectPath);
}

// Function to create a React project
function createReactProject(projectName, projectPath) {
  console.log(`Creating React project: ${projectName}...`);
  executeCommand(`npx create-react-app ${projectName}`, 'Error creating React app');

  // Remove specified files
  const filesToRemove = [
    'public/favicon.ico',
    'public/logo192.png',
    'public/logo512.png',
    'public/robots.txt',
    'src/App.test.js',
    'src/logo.svg',
    'src/reportWebVitals.js',
    'src/setupTests.js',
    'README.md',
  ];
  filesToRemove.forEach((file) => fs.unlinkSync(path.join(projectPath, file)));

  // Update src/index.js
  const indexJsContent = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  `;
  fs.writeFileSync(path.join(projectPath, 'src/index.js'), indexJsContent.trim());

  // Update src/App.js
  const appJsContent = `
import './App.scss';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
  `;
  fs.writeFileSync(path.join(projectPath, 'src/App.js'), appJsContent.trim());

  // Rename App.js to App.jsx and App.css to App.scss
  fs.renameSync(path.join(projectPath, 'src/App.js'), path.join(projectPath, 'src/App.jsx'));
  fs.renameSync(path.join(projectPath, 'src/App.css'), path.join(projectPath, 'src/App.scss'));

  // Create additional folders
  const foldersToCreate = ['components', 'pages', 'styles'];
  foldersToCreate.forEach((folder) => fs.mkdirSync(path.join(projectPath, 'src', folder)));

  // Install additional packages
  executeCommand('npm install react-router-dom sass', 'Error installing additional packages');
}

// Function to create an Angular project
function createAngularProject(projectName, projectPath) {
  console.log(`Creating Angular project: ${projectName}...`);
  executeCommand(`ng new ${projectName} --directory ${projectPath}`, 'Error creating Angular app');
}

// Function to create an "Other" project
function createOtherProject(projectName, projectPath) {
  console.log(`Creating Other project: ${projectName}...`);
  fs.mkdirSync(projectPath);
  process.chdir(projectPath);
  executeCommand('git init', 'Error initializing git repository');
}

// Function to open a folder in VS Code
function openInVSCode(folderPath) {
  console.log(`Opening project in VS Code: ${folderPath}...`);
  executeCommand(`code ${folderPath}`, 'Error opening VS Code');
}

// Function to close all applications
function closeAllApplications() {
  console.log('Closing all applications...');
  const closeAppsScript = `
  tell application "System Events"
    set the visible of every process to true
    repeat with proc in (get name of every process whose visible is true and name is not "Finder")
      try
        do shell script "killall " & quoted form of proc
      end try
    end repeat
  end tell
  `;
  executeCommand(`osascript -e '${closeAppsScript}'`, 'Error closing applications');
}

// Function to minimize all applications
function minimizeAllApplications() {
  console.log('Minimizing all applications...');
  const minimizeAppsScript = `
  tell application "System Events"
    set the visible of every process to true
    repeat with proc in (get name of every process whose visible is true and name is not "Finder")
      try
        set miniaturized of every window of process proc to true
      end try
    end repeat
  end tell
  `;
  executeCommand(`osascript -e '${minimizeAppsScript}'`, 'Error minimizing applications');
}

// Function to minimize all applications and open pornhub.com
function minimizeAndOpenPornhub() {
  minimizeAllApplications();

  // Open pornhub.com
  console.log('Opening pornhub.com...');
  executeCommand('open https://www.pornhub.com', 'Error opening Pornhub');
}

// Function to open URLs
function openUrls(urls) {
  urls.forEach(url => {
    console.log(`Opening ${url}...`);
    executeCommand(`open ${url}`, `Error opening ${url}`);
  });
}

// Existing command handlers
const handlers = {
  runTidal: (options) => executeApp('Tidal', options.update),
  openAternos: () => openUrl('https://aternos.org'),
  runLoL: (options) => executeApp('Riot Client', options.update),
  runCurseForge: (options) => executeApp('CurseForge', options.update),
  runWGC: (options) => executeApp('Wargaming.net Game Center', options.update),
  runDiscord: (options) => executeApp('Discord', options.update),
  runArc: (options) => executeApp('Arc', options.update),
  openMetalTime: () => {
    console.log('Opening Songsterr on external monitor and running Gojira X on main screen...');
    openUrl('https://www.songsterr.com');
    executeApp('Archetype Gojira X', false);
  },
  runMcServer: (options) => {
    handlers.runCurseForge(options);
    handlers.openAternos();
  },
  runRanked: (options) => {
    handlers.runLoL(options);
    openUrls(['https://loltheory.gg/', 'https://u.gg/', 'https://porofessor.gg/']);
  },
};

// Define commands with aliases
function defineCommand(name, description, handler, aliases = [], options = []) {
  const cmd = program.command(name).description(description).action(handler);
  aliases.forEach(alias => cmd.alias(alias));
  options.forEach(([option, description]) => cmd.option(option, description));
}

// Command definitions
defineCommand('tidal', 'Run Tidal application', handlers.runTidal, [], [['-u, --update', 'Run Tidal on the default screen']]);
defineCommand('aternos', 'Open Aternos website', handlers.openAternos);
defineCommand('lol', 'Run League of Legends', handlers.runLoL, [], [['-u, --update', 'Run League of Legends on the default screen']]);
defineCommand('mc', 'Run CurseForge', handlers.runCurseForge, ['minecraft', 'curseforge', 'majnkraft'], [['-u, --update', 'Run CurseForge on the default screen']]);
defineCommand('wot', 'Run Wargaming.net Game Center', handlers.runWGC, [], [['-u, --update', 'Run Wargaming.net Game Center on the default screen']]);
defineCommand('dis', 'Run Discord', handlers.runDiscord, ['discord'], [['-u, --update', 'Run Discord on the default screen']]);
defineCommand('arc', 'Run Arc', handlers.runArc, [], [['-u, --update', 'Run Arc on the default screen']]);
defineCommand('metal', 'Open Songsterr on external monitor and run Gojira X on main screen', handlers.openMetalTime, ['metal time']);
defineCommand('mcserver', 'Run CurseForge and open Aternos website', handlers.runMcServer, ['mc server'], [['-u, --update', 'Run applications on the default screen']]);
defineCommand('project', 'Create a new project', createProject);
defineCommand('close', 'Close all open applications', closeAllApplications);
defineCommand('horny', 'Minimize all applications and open pornhub.com', minimizeAndOpenPornhub);
defineCommand('ranked', 'Run League of Legends and open related websites', handlers.runRanked);

program.name('artemis').description('CLI tool to manage various tasks').version('1.0.0');

program.parse(process.argv);
