# Personal Dashboard

A small personal dashboard built with HTML, CSS, and JavaScript for WRIT 40363 (Project 3). It loads data from JSON files I authored, handles that data arriving slowly or not at all, and lets the reader choose a light or dark theme.

[**Live site:** (https://regannugent504-ui.github.io/dashboard/)

## Features

- **Sample weather widget:** loads conditions from `data/weather.json` with `fetch()`. It is labeled "Sample Weather" so a reader does not mistake it for a current report.
- **Daily quotes widget:** loads an array of quotes from `data/quotes.json` and shows a random one. The "New quote" button picks a different quote each time and stays disabled until the data has loaded.
- **Tasks widget:** lets the reader add, complete, and delete tasks. Tasks are saved in `localStorage` and a live summary shows totals and percent complete.
- **Theme toggle:** switches between light and dark mode. The choice is saved in `localStorage` and restored on the next visit.
- **Loading and error states:** a spinner appears while data loads. If a file is missing or contains invalid JSON, the reader sees a plain message instead of a blank widget or a stuck "Loading…".

## How It Works

Two tools, two jobs:

- `fetch()` loads data I wrote ahead of time, which is the same for every reader (weather and quotes).
- `localStorage` holds what is true of one reader only (their theme choice and their tasks).

Colors, spacing, and type sizes are defined as CSS custom properties (design tokens) in `styles.css`. Dark mode works by overriding those tokens under `body.theme-dark`, so the whole interface changes at once.

## Accessibility

- Skip-to-content link for keyboard users
- Visible focus styles on links, buttons, and inputs
- Labeled form fields and descriptive `aria-label`s on task checkboxes and delete buttons
- Task stats announced through an `aria-live` region
- Animations are turned off for readers who prefer reduced motion
- Responsive layout that collapses to one column on small screens

## Project Structure

```
dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── apps.js
├── data/
│   ├── weather.json
│   └── quotes.json
└── README.md
```

## Running Locally

`fetch()` does not work when you open the HTML file directly from your computer. Use a local server instead, such as the Live Server extension in VS Code: right-click `index.html` and choose "Open with Live Server."

## Deployment

The site is deployed with GitHub Pages from the `main` branch.

## Credits

Built by [YOUR NAME] for WRIT 40363, [TCU / semester]. The weather data is sample data I wrote myself, not a live feed.