# twine-wrapper

twine-wrapper is an [NW.js](https://github.com/nwjs/nw.js) app builder for your exported [`Twine`](https://bitbucket.org/klembot/twinejs/) story, to turn it into a self-contained app for Windows, OS X, or Linux.

## Getting started

To get a copy of twine-wrapper, you'll need to either [manually download it](https://github.com/drumanagh/twine-wrapper/archive/master.zip), or use [git](http://git-scm.com) and run `git clone https://github.com/drumanagh/twine-wrapper.git` where you want the `twine-wrapper` folder to be downloaded.

To use the automatic build process, you'll need to have [Node.js](https://nodejs.org) installed.

* On OS X, you can install Node.js by installing [Homebrew](https://brew.sh), then running `brew install node` in a terminal window.
* On Windows, you can install Node.js by installing [Chocolatey](https://chocolatey.org), then running `choco install nodejs` in a command window.

Once Node is installed, you'll need to use `npm install -g grunt-cli` and `npm install -g bower` in a terminal or command window to install Grunt and Bower respectively, which are used for the build process.

On OS X, you'll also need to have [Wine](https://www.winehq.org) installed to use Windows app icons. Once you have Homebrew, you can install it with `brew install wine`.

Once you have this all in place, you'll need to open that `twine-wrapper` folder in a terminal or command window, then run `npm install` and `bower install` to automatically set up the miscellaneous fiddly bits used in the build process.

## Setting up your story

You'll need to export your story from Twine and save it as `index.html` in the `story` folder inside the `twine-wrapper` folder.

Once it's there, take a look at the `package.json` file in the `story` folder, and edit it with the details of your story. The important bits are the name, homepage and bug reporting page (if any), and the author information. You'll also want to [choose whether to put your story under a license](https://creativecommons.org/choose/), which can allow others to make derivative works, or whether to leave it unlicensed.

If you have custom Windows or Mac icons, you can replace the `ico` and `icns` files in the `story` folder with them. These will automatically be included when the app is built.

`app.js` is where the toolbar menus are built. This has some sane defaults included already to make the app look like a native one, but it should be fairly easy to add or change items using the existing ones as a template if you want links that go to specific websites. See the [NW.js wiki for menu documentation](https://github.com/nwjs/nw.js/wiki/Menu).

The `about.html` file is what's loaded when you view Help -> About or, on a Mac, the About item under the app's menu title. You can toss whatever HTML into there, though you'll want to stick to the basics for it to render properly in the Mac About box.

## Building the app

If you have everything set up, you should be able to run `grunt build` at a command line in the `twine-wrapper` folder. Everything will be put together automatically, and once it's done apps for Windows, OS X, and Linux will be set up in the `build` folder under `twine-wrapper`.