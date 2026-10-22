# Dead West Railway

A co-op survival game for one to six players on Windows, macOS and Linux. Drive a steam train across the frontier with your friends: keep the boiler fed, scavenge supplies, and look out for each other on the way. Play online, with friends on your own network, or alone with no internet.

![The title screen: a steam train at dusk beneath the words Dead West Railway](screenshots/title.png)

![Riders beside their locomotive at the station, early in the morning](screenshots/departure.png)

## Download

| System                                           | Download                                                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Windows** 10 or 11, 64-bit                     | [Dead-West-Railway-Setup.exe](https://github.com/Joshspeakman/dead-west-railway/releases/latest/download/Dead-West-Railway-Setup.exe) |
| **macOS** 13 or newer, Apple Silicon and Intel   | [Dead-West-Railway.dmg](https://github.com/Joshspeakman/dead-west-railway/releases/latest/download/Dead-West-Railway.dmg)             |
| **Linux** 64-bit: Ubuntu, Debian, Mint, Pop!\_OS | [dead-west-railway_amd64.deb](https://github.com/Joshspeakman/dead-west-railway/releases/latest/download/dead-west-railway_amd64.deb) |
| **Linux** 64-bit: any other distribution         | [Dead-West-Railway.AppImage](https://github.com/Joshspeakman/dead-west-railway/releases/latest/download/Dead-West-Railway.AppImage)   |

Every version is on the [releases page](https://github.com/Joshspeakman/dead-west-railway/releases).

No download? The same game runs in a desktop browser at **[dead-west-railway.fly.dev](https://dead-west-railway.fly.dev)**.

## Install

The game isn't signed with a paid publisher certificate yet, so Windows and macOS ask you to confirm the first time you open it. That's expected.

### Windows

1. Run **Dead-West-Railway-Setup.exe**.
2. If Windows shows **"Windows protected your PC"**, click **More info**, then **Run anyway**.
3. The game installs for your user account and opens. It adds itself to the Start menu and the desktop.

To uninstall, go to **Settings → Apps → Installed apps → Dead West Railway → Uninstall**.

### macOS

1. Open **Dead-West-Railway.dmg** and drag **Dead West Railway** into **Applications**.
2. Open it from Applications. macOS will say it can't verify the app. Click **Done** (not Move to Trash).
3. Open **System Settings → Privacy & Security**, scroll down to the message about Dead West Railway, and click **Open Anyway**. Confirm with your password.

You only do this once. On macOS 14 or older you can instead right-click the app, choose **Open**, then **Open** again.

If macOS ever says the app "is damaged", run this in Terminal, then open it again:

```sh
xattr -dr com.apple.quarantine "/Applications/Dead West Railway.app"
```

### Linux

**Ubuntu, Debian, Mint, Pop!\_OS:** install the `.deb` from a terminal in your Downloads folder, then launch **Dead West Railway** from your applications menu:

```sh
sudo apt install ./dead-west-railway_amd64.deb
```

**Other distributions:** make the AppImage executable and run it:

```sh
chmod +x Dead-West-Railway.AppImage
./Dead-West-Railway.AppImage
```

If it won't start, install FUSE 2 (`libfuse2` on most distributions; `libfuse2t64` on Ubuntu 24.04 and later). If it complains about the "SUID sandbox", use the `.deb` instead, or start it with `./Dead-West-Railway.AppImage --no-sandbox`.

## Controls

Play with a keyboard and mouse, or a controller (Xbox, PlayStation or any standard gamepad). With a controller, the game shows its buttons on screen as you play.

| Key                | What it does                                                                           |
| ------------------ | -------------------------------------------------------------------------------------- |
| W A S D            | Walk                                                                                   |
| Mouse, left click  | Aim and shoot. With a melee weapon, hold to wind up                                    |
| Right mouse (hold) | Aim down the sights                                                                    |
| Shift              | Sprint                                                                                 |
| Space              | Hop, or get down from a seat                                                           |
| Space twice        | Diving roll                                                                            |
| E                  | Use, pick up, buy, take the controls. Hold for longer jobs                             |
| R                  | Reload                                                                                 |
| Q                  | Drop                                                                                   |
| 1–0, mouse wheel   | Choose from your belt                                                                  |
| Tab                | Your things                                                                            |
| M                  | Map                                                                                    |
| G                  | Your team                                                                              |
| C (hold)           | Emotes                                                                                 |
| Enter              | Chat                                                                                   |
| H                  | The handbook                                                                           |
| Esc                | Options: volume, fullscreen, graphics, UI size, vibration. In the app, Exit to Desktop |
| F11                | Fullscreen                                                                             |

Press **H** in the game for the full handbook.

---

© 2026 Joshspeakman. All rights reserved.
