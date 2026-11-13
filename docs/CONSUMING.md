# Consuming the registry

Study should sync data at build time from a pinned registry commit SHA, not a moving `main` URL. CI should download the selected files into generated static data, validate JSON and question IDs/answer indices, then build. Raw URL pattern: `https://raw.githubusercontent.com/MANABIXX/content-registry/<commit-sha>/<path>`.
