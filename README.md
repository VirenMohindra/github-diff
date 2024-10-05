# GitHub Diff - Chrome Extension

This Chrome extension provides helpful tools for interacting with GitHub pull request pages. It allows users to:

- Open the diff file of a pull request
- Open files changed in the pull request in raw mode
- Open the pull request diff in ChatGPT for analysis and suggestions

## Features
- **Open Diff**: Opens the `.diff` file of the current pull request in a new tab
- **Open in ChatGPT**: Sends the diff content to ChatGPT and prompts for feedback, suggestions, and improvements
  - Ability to edit the prompt message before sending to ChatGPT 
- **Open Raw Files**: Opens the raw versions of the files in the "Files changed" tab for easier access

## Getting Started

### Prerequisites
- Yarn

### Installation
Clone this repository to your local machine:

```bash
git clone https://github.com/virenmohindra/github-diff.git
```
and then navigate to the project directory and install the dependencies:
```bash
yarn
```

Build the project to compile TypeScript into JavaScript:
```bash
yarn build
```

## Load the extension in Chrome:

- Open `chrome://extensions/` in your browser
- Enable "Developer mode" (toggle in the top right corner)
- Click "Load unpacked" and select the project folder 

The extension should now be available in your Chrome extensions bar

## Development Workflow
Run `yarn watch` to automatically rebuild the project when files are changed

To apply changes to the extension:
- Rebuild the project with `yarn build`
- Reload the extension from `chrome://extensions/`

## Folder Structure
- `src/`: contains the TypeScript source files for the extension
- `dist/`: this is the output folder where the compiled JavaScript files are located after building

### Key Files
- `popup.html`: the UI for the Chrome extension popup
- `popup.ts`: contains the logic for handling the button actions inside the popup
- `manifest.json`: the Chrome extension manifest file, which defines the extension’s permissions, background scripts, and popup details

## Usage
- Navigate to a GitHub pull request
- Click on the extension icon to open the popup 
- Use the following options:
  - Open Diff: Opens the `.diff` file of the pull request 
  - Open in ChatGPT: Sends the pull request's diff to ChatGPT for analysis 
  - Open Raw Files: Opens the raw versions of the files from the "Files changed" tab

## Development Notes
- The extension uses TypeScript to ensure type safety and Yarn for package management
- The code is automatically built into the `dist/` folder, which is used as the extension's source
- `popup.js` handles the logic of each button, ensuring the correct actions are executed depending on the page URL

## Contributing
Feel free to fork this project and make improvements. Submit a pull request with your changes, and they will be reviewed

## To Do
- [ ] Add more features for better GitHub PR navigation
- [ ] Improve error handling and edge case coverage


### License
This project is licensed under the MIT License - see the LICENSE file for details
