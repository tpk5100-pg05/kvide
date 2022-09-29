# Smerteboken

**Chronic pain log book**

## Development

### Tooling

* node 16+
* yarn

### Setup guide

1. Clone the repository either through:
   * [GitHub Desktop](https://desktop.github.com/) (easiest for beginners)
   * [Git](https://git-scm.com/downloads) (if you've used Git before)
2. Install Node.js LTS (16+)
   * [Windows (msi)](https://nodejs.org/en/download/)
   * [Windows (scoop, chocolatey, winget)](https://nodejs.org/en/download/package-manager/#windows-1)
   * [MacOS (pkg)](https://nodejs.org/en/download/)
   * [MacOS (homebrew, macports)](https://nodejs.org/en/download/package-manager/#macos)
   * [Linux](https://nodejs.org/en/download/package-manager/)
3. Install Yarn
   * Windows
     1. open PowerShell as Administrator
     2. go to the directory where you cloned the repository
     3. enable execution of scripts:
        * `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`
     4. install Yarn:
        * `corepack enable`
     5. check that Yarn is installed:
        * `yarn --version`
   * MacOS
     1. open the repository in Terminal
     2. install Yarn:
        * `corepack enable`
     3. check that Yarn is installed:
        * `yarn --version`
   * Linux
     * you know what to do
4. Install dependencies
   1. in terminal, open the directory where you cloned the repository
   2. run `yarn install`
5. Open the repository in your editor/IDE of choice
   * [WebStorm](https://www.jetbrains.com/webstorm/)
     * recommended for not needing to install any plugins and better tooling
     * used by Marek
   * [Visual Studio Code](https://code.visualstudio.com/)
     * recommended for lighter footprint and not needing to sign-up for a JetBrains account
     * used by Håvard

### Running the app

1. In terminal, open the directory where you cloned the repository
2. Run `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app
4. Before committing your changes, run `yarn build` to make sure the app is buildable. The dev server is less restrictive than the production build.

### Committing your changes

1. Review the changes you've made, either through `git status`, via UI in GitHub Desktop or through your editor/IDE
2. Create a new branch for your new feature
   * GitHub Desktop: click the "Current branch" button and select "New branch"
   * Git: `git checkout -b <branch-name>`
3. Commit your changes
4. Push your changes to GitHub

## Project structure

### `store`

Contains all the data related logic of the application. For us, the important parts are:

* `store/episodes`
  * contains all the R/W logic for episodes
* `store/medications`
  * contains all the R/W logic for medications
* `store/symptoms`
  * contains all the R/W logic for symptoms
* `types.ts`
  * contains all the types of Epiodes, Medications and Symptoms
  * the types aren't really easy to read at the first glance, if needed, try creating a new temporary variable with a specific type and check the autocomplete suggestions

### `pages`

Contains the pages of the app. Each page is a folder with a React component. If you were to create a new page, you also need to register in the router at `routes/index.ts`.

### `components`

Contains so-called **dumb** components. These are components that are not aware of the state of the app, and are only concerned with rendering the UI. That means that they should only work with data passed to them as props and with their own local state.

### `sections`

Contains so-called **smart** components. These are components that are aware of the state of the app.

### `utils`

Contains various **dumb** helper functions and types.

### `hooks`

Kind of similar to `utils` but solely for React hooks.

### `theme`

Contains config of the theming used by the underlying UI library.
