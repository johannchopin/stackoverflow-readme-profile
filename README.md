# stackoverflow-readme-profile

Easily share your Stackoverflow's profile on your README.

![SO profile](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/profile/themes/dark.svg)

<a href="https://github.com/johannchopin/stackoverflow-readme-profile/actions">
  <img src="https://github.com/johannchopin/stackoverflow-readme-profile/actions/workflows/test.yml/badge.svg" alt="test workflow">
</a>
<a href="https://codecov.io/gh/johannchopin/stackoverflow-readme-profile">
  <img src="https://codecov.io/gh/johannchopin/stackoverflow-readme-profile/branch/main/graph/badge.svg" alt="codecov">
</a>
<a href="https://semver.org/">
  <img src="https://img.shields.io/badge/Versioning-SemVer-blue" alt="This projet uses SemVer for versioning"/>
</a>
<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg" alt="Gitmoji">
</a>

---

## 💡 How to use?

You can generate your SO profile by calling this url with the corresponding [template name](#templates) and your SO user id:

```
https://stackoverflow-readme-profile.johannchopin.fr/:template/:id
```

Use it like that in your README:

```md
[![johannchopin's SO profile](https://stackoverflow-readme-profile.johannchopin.fr/:template/:id)](https://github.com/johannchopin/stackoverflow-readme-profile)
```

---

## 📄 Templates

- [profile](#profile)
- [profile-small](#profile-small)

### profile

Render a profile image by using the `profile` template:

```
https://stackoverflow-readme-profile.johannchopin.fr/profile/:id
```

![profile](./docs/profile/themes/dark.svg)

#### Params (as query strings)

| param      |  default  | description                                                    |
| :--------- | :-------: | :------------------------------------------------------------- |
| `theme`    | `default` | Theme to use. [Check them out here!](./docs/profile/README.md) |
| `website`  |  `true`   | Show or not the website URL (`true` \| `false`)                |
| `location` |  `true`   | Show or not the location (`true` \| `false`)                   |

### profile-small

Render a smaller profile image without the location and the website

![profile](./docs/profile-small/themes/dark.svg)

#### Params (as query strings)

| param   |  default  | description                                                          |
| :------ | :-------: | :------------------------------------------------------------------- |
| `theme` | `default` | Theme to use. [Check them out here!](./docs/profile-small/README.md) |

---

## 🐳 Docker

### Build the image

You can build the image by using the following command:

```bash
docker build -t johannchopin/stackoverflow-readme-profile .
```

### Push the image

You can push the image by using the following command:

```bash
docker push johannchopin/stackoverflow-readme-profile
```

### Run the application

To run the app together with postgresql you will need to copy the `docker-compose.yml` file on you server. Near to it add a new `.env` file and adapt the variables. You will find an example of it in `./.env.example`. You can then run:

```bash
docker-compose pull # be sure to get the latest johannchopin/stackoverflow-readme-profile image version
docker-compose up # start the engine
```

### Stop the application

```bash
docker-compose stop
```
