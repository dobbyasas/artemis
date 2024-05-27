#!/usr/bin/env node

const { program } = require('commander');
const { exec } = require('child_process');

// Function to run Tidal application
function runTidal() {
  console.log('Running Tidal application...');
  exec('open -a "Tidal"', (err) => {
    if (err) {
      console.error('Error running Tidal:', err);
    }
  });
}

// Function to open Aternos website
function openAternos() {
  console.log('Opening Aternos website...');
  exec('open https://aternos.org', (err) => {
    if (err) {
      console.error('Error opening Aternos website:', err);
    }
  });
}

// Function to run League of Legends
function runLoL() {
  console.log('Running League of Legends...');
  exec('open -a "Riot Client"', (err) => {
    if (err) {
      console.error('Error running League of Legends:', err);
    }
  });
}

// Function to run CurseForge
function runCurseForge() {
  console.log('Running CurseForge...');
  exec('open -a "CurseForge"', (err) => {
    if (err) {
      console.error('Error running CurseForge:', err);
    }
  });
}

// Function to run Archetype Tim Henson
function openRockTime() {
  console.log('Opening Songsterr and running Archetype Tim Henson...');
  exec('open https://www.songsterr.com', (err) => {
    if (err) {
      console.error('Error opening Songsterr:', err);
    }
  });
  exec('open -a "Archetype Tim Henson"', (err) => {
    if (err) {
      console.error('Error running Archetype Tim Henson:', err);
    }
  });
}

// Function to run Wargaming.net Game Center
function runWGC() {
  console.log('Running Wargaming.net Game Center...');
  exec('open -a "Wargaming.net Game Center"', (err) => {
    if (err) {
      console.error('Error running Wargaming.net Game Center:', err);
    }
  });
}

// Function to run Discord
function runDiscord() {
  console.log('Running Discord...');
  exec('open -a "Discord"', (err) => {
    if (err) {
      console.error('Error running Discord:', err);
    }
  });
}

// Function to run Arc
function runArc() {
  console.log('Running Arc...');
  exec('open -a "Arc"', (err) => {
    if (err) {
      console.error('Error running Arc:', err);
    }
  });
}

// Function to open Songsterr on the external monitor and run Gojira X on the main screen
function openMetalTime() {
  console.log('Opening Songsterr on external monitor and running Gojira X on main screen...');

  // Open Songsterr on external monitor (assume the external monitor is display 2)
  exec('open -na "Google Chrome" --args --new-window "https://www.songsterr.com"', (err) => {
    if (err) {
      console.error('Error opening Songsterr:', err);
    } else {
      // Move Google Chrome to the external monitor (you may need to adjust the display ID)
      exec('displayplacer "id:<external-monitor-id> res:1920x1080 hz:60 color_depth:8 scaling:on origin:(0,0)"', (err) => {
        if (err) {
          console.error('Error moving Songsterr to external monitor:', err);
        }
      });
    }
  });

  // Open Archetype Gojira X on the main screen
  exec('open -a "Archetype Gojira"', (err) => {
    if (err) {
      console.error('Error running Archetype Gojira:', err);
    }
  });
}

program
  .name('artemis')
  .description('CLI tool to manage various tasks')
  .version('1.0.0');

program
  .command('tidal')
  .description('Run Tidal application')
  .action(runTidal);

program
  .command('aternos')
  .description('Open Aternos website')
  .action(openAternos);

program
  .command('lol')
  .description('Run League of Legends')
  .action(runLoL);

program
  .command('mc')
  .description('Run CurseForge')
  .action(runCurseForge);

program
  .command('wot')
  .description('Run Wargaming.net Game Center')
  .action(runWGC);

program
  .command('dis')
  .description('Run Discord')
  .action(runDiscord);

program
  .command('arc')
  .description('Run Arc')
  .action(runArc);

program
  .command('metal')
  .description('Open Songsterr on external monitor and run Gojira X on main screen')
  .action(openMetalTime);

program.parse(process.argv);
