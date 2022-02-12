<script>
  import { GITHUB_REPO_NAME, GITHUB_REPO_URL, GITHUB_REPO_USER } from "$lib/constants";
  import GithubIcon from "./icons/Github.svelte";
</script>

<nav {...$$restProps} class={`d-flex justify-content-end align-items-center ${$$restProps.class}`}>
  <a href={GITHUB_REPO_URL} target="_blank" class="me-2 link-light text-decoration-none">
    <span aria-hidden="true">
      <GithubIcon />
      GitHub
    </span>
    <span class="visually-hidden">Link to GitHub's repository</span>
  </a>
  <a class="p-1" href={`${GITHUB_REPO_URL}/stargazers`} target="_blank">
    <img alt="GitHub Repo stars" src={`https://img.shields.io/github/stars/${GITHUB_REPO_USER}/${GITHUB_REPO_NAME}?style=social`}>
  </a>
</nav>
