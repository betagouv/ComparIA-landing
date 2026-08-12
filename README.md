# Open Source LLM Arena landing page

<p align="center">
  <a href="https://comparia.beta.gouv.fr/">🇫🇷 French platform</a>
</p>

<p align="center">
  <img src="https://github.com/simonaszilinskas/fourre-tout/blob/main/Frame%2014254.png?raw=true" alt="Supported by DINUM, Ministry of Culture, ALT-EDIC, Denmark, and recognised as a Digital Public Good" />
</p>

## Developing

```sh
cd app
cp .env.example .env
yarn
yarn dev
```

`PUBLIC_ARENA_URL` points at the arena app, `MATOMO_URL` and `MATOMO_ID` turn on analytics.
Leave the Matomo pair empty and the tracker is left out of the page.

```sh
yarn lint
yarn run check   # `yarn check` runs yarn's own command, not this script
yarn build
```

## Utilities

```sh
# Run locales files cleaning/ordering.
python -m scripts.i18n
```
