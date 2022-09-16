<script lang="ts">
  import { page } from "$app/stores";
  import SocialLinks from "./SocialLinks.svelte";

  type Link = {
    href: string;
    label: string;
  };

  $: routeId = "/" + $page.routeId;

  const LINKS: Link[] = [
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/tags-league",
      label: "Tags-league",
    },
  ];
</script>

<div class="mt-3 mb-5 d-flex justify-content-between align-items-center">
  <a href="/" class="d-flex align-items-center link-light text-decoration-none">
    <img src="/favicon.png" style="width: 1.5rem;" alt="project icon" />
    <span class="fs-5 ms-1 d-none d-md-inline"
      >stackoverflow-readme-profile
    </span>
  </a>

  <div class="d-flex">
    <nav
      {...$$restProps}
      class={`d-flex align-items-center ${$$restProps.class}`}
    >
      {#each LINKS as { href, label }}
        <a
          {href}
          class="me-2 link-light text-decoration-none btn btn-sm"
          class:btn-outline-secondary={!routeId.startsWith(href)}
          class:btn-outline-primary={routeId.startsWith(href)}>{label}</a
        >
      {/each}
    </nav>
    <span class="mx-3 text-primary fs-5" />
    <SocialLinks />
  </div>
</div>
