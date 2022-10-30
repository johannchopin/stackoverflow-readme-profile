<script lang="ts">
  import { getPathToRankingBadge, getRankingBadgeCode } from "$lib/utils";
  import {
    MD_CODE_RANKING_TEMPLATE,
    HTML_CODE_RANKING_TEMPLATE,
  } from "$lib/constants";
  import Code from "$lib/components/Code.svelte";

  export let userId: string;
  export let tag: string;
  export let theme: string;

  $: pathToBadge = getPathToRankingBadge(tag, userId, theme);

  $: mdCode = getRankingBadgeCode(MD_CODE_RANKING_TEMPLATE, tag, userId, theme);
  $: htmlCode = getRankingBadgeCode(
    HTML_CODE_RANKING_TEMPLATE,
    tag,
    userId,
    theme
  );
</script>

<div class="row {$$restProps.class || ''}">
  <div class="col-8 col-md-3">
    <img
      src={pathToBadge}
      alt="user:{userId}'s ranking profile"
      class="w-100"
    />
  </div>

  <div class="codes col-12 col-md-7 mt-3 mt-md-0">
    <h4 class="fst-italic fw-bold fs-6 m-0 p-2 bg-dark rounded w-fit-content">
      Markdown
    </h4>
    <Code code={mdCode} />
    <h4
      class="fst-italic fw-bold fs-6 m-0 mt-2 p-2 bg-dark rounded w-fit-content"
    >
      HTML
    </h4>
    <Code code={htmlCode} />
  </div>
</div>
