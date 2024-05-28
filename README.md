# Artemis CLI Tool

Artemis is a command-line interface (CLI) tool designed to manage various tasks on your macOS system. It provides commands to run applications, open websites, manage projects, and more, all from the terminal.

## Features

- **Run Applications**: Quickly launch applications like Tidal, Discord, Arc, etc.
- **Open Websites**: Open websites like Aternos, Songsterr, and more.
- **Manage Projects**: Create new projects in React, Angular, or a custom setup.
- **Automation**: Automate repetitive tasks with simple commands.
- **Custom Commands**: Easily add new commands to extend functionality.
- **Pause Media**: Pause any playing media with a simple command.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/dobbyasas/artemis.git
    cd artemis
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Make the script executable**:
    ```sh
    chmod +x cli.js
    ```

4. **Link the CLI tool globally**:
    ```sh
    npm link
    ```

## Usage

Once installed, you can use the `artemis` command followed by various subcommands.

### Running Applications

- **Tidal**: Run the Tidal application.
    ```sh
    artemis tidal
    ```

- **Discord**: Run the Discord application.
    ```sh
    artemis discord
    ```

- **Arc**: Run the Arc application.
    ```sh
    artemis arc
    ```

### Opening Websites

- **Aternos**: Open the Aternos website.
    ```sh
    artemis aternos
    ```

- **Songsterr and Gojira X**: Open Songsterr on the external monitor and run Gojira X on the main screen.
    ```sh
    artemis metal
    ```

### Managing Projects

- **Create a new project**:
    ```sh
    artemis project
    ```

    You will be prompted to enter the project name and type (React, Angular, or Other). Depending on the selection, Artemis will set up the project and open it in VS Code.

### Special Commands

- **Close all applications**:
    ```sh
    artemis close
    ```

- **Minimize all applications and open pornhub.com**:
    ```sh
    artemis horny
    ```

- **Run League of Legends and open related websites**:
    ```sh
    artemis ranked
    ```

- **Play a song on Tidal**:
    ```sh
    artemis play "Song Name"
    ```

### Searching the Web

- **Search on Google**:
    ```sh
    artemis search "Search Query"
    ```

## Custom Commands

You can define new commands or aliases easily within the `cli.js` file. Simply add new functions and use the `defineCommand` function to register them.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
