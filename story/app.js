var gui = require('nw.gui'),
    os  = require('os'),
    pjson = require('./package.json');;

// Create an empty menu.
var menubar = new gui.Menu({type: 'menubar'});

// If we're on OS X, attach built-in menu items and nice app name.
if (os.platform() === "darwin") {
  menubar.createMacBuiltin(pjson.window.title);
}

// Create a help menu and append it.
var help_menu = new gui.Menu();
help_menu.append(new gui.MenuItem({ label: pjson.window.title + ' Homepage', click: function() {
  gui.Shell.openExternal(pjson.homepage);
} }));

// Add a 'Report a Bug' item, but only if there's an address set.
if (pjson.bugs !== null && pjson.bugs !== '') {
  help_menu.append(new gui.MenuItem({ label: 'Report a Bug', click: function() {
    gui.Shell.openExternal(pjson.bugs);
  } }));
}

help_menu.append(new gui.MenuItem({ type: 'separator' }));
help_menu.append(new gui.MenuItem({ label: 'About', click: function() {
  window.open('//host/about.html');
} }));

help_menuitem = new gui.MenuItem({ label: 'Help' });
help_menuitem.submenu = help_menu;
menubar.append(help_menuitem);

// Set app to use the menu created here.
gui.Window.get().menu = menubar;

/* =============================================================================
   Don't change the lines below. They're needed to avoid errors with Twine.
   ========================================================================== */

window.requireNode = window.require;
window.require = undefined;