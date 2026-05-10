# Create parallax effect

This is a code bundle for Create parallax effect. The original project is available at https://www.figma.com/design/rVhqkq3yR3pqnBsOKZ5VEx/Create-parallax-effect.

## How to get the project onto your computer

If you do **not** already have a `Portfolio` project folder on your computer, download it from GitHub first.

### Option A: Download ZIP, easiest

1. Open the GitHub repository page in your browser.
2. Click the green **Code** button.
3. Click **Download ZIP**.
4. Open your Downloads folder.
5. Double-click the ZIP file to unzip it.
6. Move the unzipped folder somewhere easy to find, like your Desktop.

After this, you should have a real folder on your computer, for example:

```text
Desktop/Portfolio
```

### Option B: Clone with Git

If you already have Git installed, open Terminal and run:

```bash
cd Desktop
git clone https://github.com/mansichauhan1399/Portfolio.git
cd Portfolio
```

If your GitHub repo URL is different, copy the clone URL from the green **Code** button on GitHub and use that instead.

## How to run this website locally

You only need to use Terminal for three things: go to the project folder, install the project once, and start the preview server.

### 1. Open Terminal

On macOS, open **Terminal** from Applications → Utilities, or press `Cmd + Space`, type `Terminal`, and press Enter.

### 2. Go to the project folder

If you downloaded or cloned the project to your Desktop, run:

```bash
cd ~/Desktop/Portfolio
```

If your folder has a different name, type `cd ` with a space after it, drag the project folder into the Terminal window, and press Enter.

Do **not** type `/path/to/Portfolio` literally. That was only an example placeholder.

### 3. Install dependencies once

Run this command inside the project folder:

```bash
npm i
```

Wait until it finishes. You only need to do this again when dependencies change.

### 4. Start the local preview

Run:

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

Open that URL in Chrome. Keep the Terminal window open while previewing the portfolio.

### 5. Stop the preview when finished

Click the Terminal window and press:

```text
Control + C
```

## Troubleshooting

### Chrome says "localhost refused to connect"

That means the local preview server is not currently running on your computer.

Fix it by going back to Terminal, making sure you are in the project folder, and running:

```bash
npm run dev
```

Then open the exact URL Vite prints.

### `npm` command not found

Install Node.js from https://nodejs.org/, then close and reopen Terminal and try again.

### You are using a remote workspace

If the code is running in a remote container/workspace, your computer's `localhost` may not work directly. Use the forwarded/preview URL for port `5173` that your workspace provides.
