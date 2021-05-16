# Contributing to stackoverflow-readme-profile

Hello! 👋

Thanks for contributing on [stackoverflow-readme-profile](https://github.com/johannchopin/stackoverflow-readme-profile/). Before implementing new features and changes, feel free to [submit an issue](https://github.com/johannchopin/stackoverflow-readme-profile/issues/new). We're going to talk here.

## 🌱 How to submit a pull request?

1. Fork this repository.
2. Create a new feature branch. (Eg: `feature/add-theme-burgger`)
3. Make your changes.
4. Make a little check using `yarn lint && yarn test`
5. Commit your changes using the [gitmoji](https://gitmoji.dev/) convention.
6. Submit your pull request.

## 🔨 How to start stackoverflow-readme-profile locally

1. Clone the project

```bash
git clone https://github.com/johannchopin/stackoverflow-readme-profile.git
cd stackoverflow-readme-profile
```

1. Install the dependencies

```bash
yarn
```

3. Add the .env variables

You will find an example of it in `./.env.example`.

4. Run the start script

You can easily see your change by running the express api located in `./src/api.ts`:

```bash
yarn start
```
