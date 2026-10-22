// Dead West Railway for the desktop: a game window onto the server. The game itself lives on
// the server and loads fresh each launch, so the app never falls out of step with it.
const { app, BrowserWindow, Menu, net, session, shell } = require('electron');
const path = require('node:path');

// Where the game is served. DWR_SERVER points the app at another server (a local one, say).
const SERVER = new URL(process.env.DWR_SERVER || 'https://dead-west-railway.fly.dev');
// A sleeping server takes a few seconds to wake; keep knocking this long before giving up.
const WAKE_TIMEOUT = 60_000;
// What the game page may ask the browser for: copying the room code, and going fullscreen.
const ALLOWED_PERMISSIONS = new Set(['clipboard-sanitized-write', 'fullscreen', 'pointerLock']);

let win = null;
let connecting = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isServer = (url) => {
  try {
    return new URL(url).origin === SERVER.origin;
  } catch {
    return false;
  }
};
const showSplash = (state) =>
  win.loadFile(path.join(__dirname, 'splash.html'), { query: { state } });

/** Ask the server whether it is up, until it answers or the wait runs out. */
async function serverAwake() {
  const until = Date.now() + WAKE_TIMEOUT;
  while (Date.now() < until) {
    try {
      const res = await net.fetch(new URL('/health', SERVER).href, {
        signal: AbortSignal.timeout(15_000),
        cache: 'no-store',
      });
      if (res.ok) return true;
    } catch {}
    await sleep(1500);
  }
  return false;
}

/** Show the waking screen, wait for the server, then open the game (or say it can't be reached). */
async function connect() {
  const attempt = ++connecting;
  await showSplash('waking');
  const awake = await serverAwake();
  if (attempt !== connecting || !win) return;
  if (awake) win.loadURL(SERVER.href);
  else showSplash('offline');
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    show: false,
    title: 'Dead West Railway',
    backgroundColor: '#140b06',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      // Music and the train's whistle can start without a click first.
      autoplayPolicy: 'no-user-gesture-required',
    },
  });
  win.once('ready-to-show', () => win.show());
  win.on('closed', () => (win = null));

  const contents = win.webContents;
  // The window only ever shows the game or its own splash; any other link opens in the browser.
  contents.on('will-navigate', (event, url) => {
    if (isServer(url) || url.startsWith('file:')) return;
    event.preventDefault();
    if (/^https?:/.test(url)) shell.openExternal(url);
  });
  contents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  // The splash's "try again" link.
  contents.on('did-navigate-in-page', (_event, url) => {
    if (url.startsWith('file:') && url.endsWith('#retry')) connect();
  });
  // Lost the server while loading the game: back to the splash, which offers another try.
  contents.on('did-fail-load', (_event, code, _desc, url, mainFrame) => {
    if (mainFrame && code !== -3 && isServer(url)) showSplash('offline');
  });
  contents.on('render-process-gone', () => connect());
  // F11 toggles fullscreen everywhere (the game's own options do too).
  contents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
    }
  });

  connect();
}

// One window at a time: a second launch brings the first forward (two windows would share one
// rider and could not both sit in the same posse).
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(() => {
    session.defaultSession.setPermissionRequestHandler((contents, permission, done) =>
      done(isServer(contents.getURL()) && ALLOWED_PERMISSIONS.has(permission)),
    );
    session.defaultSession.setPermissionCheckHandler(
      (contents, permission) =>
        !!contents && isServer(contents.getURL()) && ALLOWED_PERMISSIONS.has(permission),
    );
    // No menu bar, except on macOS, where Quit, copy and paste (a room code) live in the menu.
    Menu.setApplicationMenu(
      process.platform === 'darwin'
        ? Menu.buildFromTemplate([
            { role: 'appMenu' },
            { role: 'editMenu' },
            {
              label: 'View',
              submenu: [{ role: 'reload' }, { type: 'separator' }, { role: 'togglefullscreen' }],
            },
            { role: 'windowMenu' },
          ])
        : null,
    );
    createWindow();
    app.on('activate', () => {
      if (!win) createWindow();
    });
  });

  app.on('window-all-closed', () => app.quit());
}
