# Next Lift — putting it on your phone

Next Lift is an offline-first web app. Once it's on a web address and you've opened it once with signal, your phone keeps a copy and it works with no connection at all. All your logs are stored on the phone.

## 1. Host it on GitHub Pages (once, about 10 minutes)

1. Sign in at github.com (create a free account if you don't have one).
2. Top-right **+** → **New repository**. Name it `next-lift`, leave it **Public** (Pages is free on public repos), tick **Add a README** is *not* needed. Click **Create repository**.
3. On the new empty repo page click **uploading an existing file**. Drag in all the files from this folder **except this README** (`index.html`, `sw.js`, `manifest.webmanifest`, and the three `icon-*.png` files). Click **Commit changes**.
4. Go to **Settings** (tab along the top of the repo) → **Pages** in the left menu.
5. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder **/ (root)**. Click **Save**.
6. Wait a minute, then refresh the Pages settings page. It will show your address, something like `https://YOURNAME.github.io/next-lift/`.

## 2. Install it on your phone

Open that address on your phone once while you have signal, then:

- **iPhone (Safari):** tap the Share button → **Add to Home Screen** → **Add**.
- **Android (Chrome):** tap the ⋮ menu → **Add to Home screen** (or **Install app**).

Launch it from the home screen icon from now on. It opens instantly and works underground.

## 3. Updating the app later

If you get a new version of `index.html` (or any other file), upload it to the repo again (repo page → **Add file** → **Upload files**, replacing the old one). Phones pick the update up the next time they open the app with signal. If a new version doesn't appear, close the app fully and reopen it once.

## Your data

Everything lives on your phone. In the app, **Plan → Back up** saves a small `.json` file you can keep in Files/Drive or AirDrop to your laptop; **Restore from file** loads one back in (on a new phone, for example). Take a backup every few weeks.
