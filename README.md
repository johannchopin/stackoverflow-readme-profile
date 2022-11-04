# stackoverflow-readme-profile

Easily share your Stackoverflow's profile on your README.

<div style="display: flex; justify-content: center;">
  <img src="https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/banner.png" width="100%" style="max-width: 600px; border-radius: 4px; margin-x: 40px; margin-bottom: 20px;">
</div>

<div style="display: flex; justify-content: center;">
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
</div>

---

## [➡️ Get your profile badge](https://stackoverflow-readme-profile.vercel.app):

![SO profile](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/profile/themes/dark.svg)
![SO profile-small](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/profile-small/themes/default.svg)

<details>
<summary>💡 How to use?</summary>

> Use the [online generator](https://stackoverflow-readme-profile.vercel.app/profile) for a quicker setup

You can generate your SO profile by calling this url with the corresponding [template name](#templates) and your SO user id:

```
https://stackoverflow-readme-profile.johannchopin.fr/:template/:id
```

Use it like that in your README:

```md
[![johannchopin's SO profile](https://stackoverflow-readme-profile.johannchopin.fr/:template/:id)](https://github.com/johannchopin/stackoverflow-readme-profile)
```

---

### 📄 Templates

- [profile](#profile)
- [profile-small](#profile-small)

#### profile

Render a profile badge by using the `profile` template:

```
https://stackoverflow-readme-profile.johannchopin.fr/profile/:id
```

![profile](./docs/profile/themes/dark.svg)

##### Params (as query strings)

| param      |  default  | description                                                    |
| :--------- | :-------: | :------------------------------------------------------------- |
| `theme`    | `default` | Theme to use. [Check them out here!](./docs/profile/README.md) |
| `website`  |  `true`   | Show or not the website URL (`true` \| `false`)                |
| `location` |  `true`   | Show or not the location (`true` \| `false`)                   |

#### profile-small

Render a smaller profile badge without the location and the website

![profile](./docs/profile-small/themes/dark.svg)

##### Params (as query strings)

| param   |  default  | description                                                          |
| :------ | :-------: | :------------------------------------------------------------------- |
| `theme` | `default` | Theme to use. [Check them out here!](./docs/profile-small/README.md) |

</details>

---

## [➡️ Get your ranking badge](https://stackoverflow-readme-profile.vercel.app):
![Tags league ranking badge: theme default](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/tags-league-ranking/themes/default.svg)
![Tags league ranking badge: theme cobalt](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/tags-league-ranking/themes/cobalt.svg)
![Tags league ranking badge: theme dark](https://raw.githubusercontent.com/johannchopin/stackoverflow-readme-profile/main/docs/tags-league-ranking/themes/dark.svg)

<details>
<summary>💡 How to use?</summary>

> Use the [online generator](https://stackoverflow-readme-profile.vercel.app/tags-league) for a quicker setup

You can generate your SO ranking badge by calling this url with the desired technology ([see the tags list](./src/tags-league/TAGS.json)) and your SO user id:

```
https://stackoverflow-readme-profile.johannchopin.fr/tags-league-ranking/:tagName/:id
```

### Params (as query strings)

| param   |  default  | description                                                                |
| :------ | :-------: | :------------------------------------------------------------------------- |
| `theme` | `default` | Theme to use. [Check them out here!](./docs/tags-league-ranking/README.md) |

</details>

## 📄 License

[AGPL-3.0](./LICENSE.txt)
