---------------------
The Neos Demo Package
---------------------

This is the default site package installed with the Neos base distribution. With this package, you can quickly have
a look into how easy content can be generated and changed.
It also shows the basic concepts of how to build a site package with custom node types and plugins.


About the frontend build stack
==============================

We included a frontend build stack based on Node.js_, NVM_, webpack_ and Yarn_. The webpack_ configuration includes Babel_, PostCSS_ and Sass_. 

    **Note:**
    If you want to have a build stack for a Mono-Repo, you can take a look at our Neos.io_ package.


Installation
------------

Make sure that Node.js_ and Yarn_ are installed. It is recommended to use NVM_ to manage versions of the Node.js_ versions.

.. code-block:: bash

 # Enable the correct nvm
 nvm use
 # Install the package dependencies
 yarn


Commands
--------

=================== ==================================================
Command             Description
=================== ==================================================
``yarn build``      Builds all assets
``yarn pipeline``   Runs install and then build all assets
``yarn start``      Watches the sources and rebuilds assets on change
=================== ==================================================


Package management
------------------

The dependencies are stored in the package.json_ file, so if you edit any config, who need new packages (Like React_, Vue.js_, TypeScript_, etc.), you have to add them to this file. You can read more about this `here <https://nodejs.dev/the-package-json-guide>`_.


webpack.packages.js_
--------------------

In this file, we set the files we want to render. Currently, we render only one Main.js and Main.css files, but if you're going to
have multiple files for your package, here is the point where you can add them.


Explanation of the config files:
--------------------------------

==================================== =========================================================================================
File Name                            Explantion
==================================== =========================================================================================
`.editorconfig <.editorconfig>`_     EditorConfig_ helps maintain consistent coding styles
`.eslintignore <.eslintignore>`_     These files get ignored from ESLint_
`.eslintrc <.eslintrc>`_             The configuration file for ESLint_, a pluggable JavaScript linter
`.jshintrc <.jshintrc>`_             The configuration for JSHint_, a static code analysis tool for JavaScript
`.nvmrc <.nvmrc>`_                   This file contains the required Node.js_ version and is used by NVM_
`.prettierignore <.prettierignore>`_ These files gets excluded from the Prettier_ code formatting
`.prettierrc <.prettierrc>`_         This is the configuration file for Prettier_
`.stylelintrc <.stylelintrc>`_       This is the configuration file for StyleLint_
`.yarnclean <.yarnclean>`_           Cleans and removes unnecessary files from package dependencies
babel.config.js_                     This is the configuration file for Babel_. If you want to enable something like React_ TypeScript_ or Vue.js_, here is the right place to do this
package.json_                        In this file all your dependencies from the build stack are stored
webpack.config.js_                   This is the configuration for webpack_
yarn.lock_                           This is the lockfile for Yarn_. This is needed to get consistent installs across machines
==================================== =========================================================================================

.. _webpack: https://webpack.js.org/
.. _Yarn: https://yarnpkg.com/
.. _Babel: https://babeljs.io/
.. _PostCSS: https://postcss.org/
.. _Sass: https://sass-lang.com/
.. _Neos.io: https://github.com/neos/Neos.NeosIo
.. _EditorConfig: https://editorconfig.org/
.. _ESLint: https://eslint.org/
.. _JSHint: https://jshint.com/
.. _NVM: https://github.com/nvm-sh/nvm#readme
.. _Node.js: https://nodejs.org/
.. _Prettier: https://prettier.io/
.. _StyleLint: https://stylelint.io/
.. _React: https://reactjs.org/
.. _TypeScript: https://www.typescriptlang.org/
.. _Vue.js: https://vuejs.org/
.. _babel.config.js: babel.config.js
.. _package.json: package.json
.. _webpack.config.js: webpack.config.js
.. _webpack.packages.js: webpack.packages.js
.. _yarn.lock: yarn.lock
