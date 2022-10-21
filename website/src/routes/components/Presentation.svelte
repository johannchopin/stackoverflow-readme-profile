<script>
  import { GITHUB_REPO_URL } from "$lib/constants";
  import Faq from "./Faq.svelte";
</script>

<section class="position-relative container pb-5">
  <div class="row justify-content-center">
    <div class="col-md-10 col-l-6">
      <p class="fs-5 text-center">
        <span class="fw-bold"> stackoverflow-readme-profile </span>
        is an
        <a href={GITHUB_REPO_URL} target="_blank">open-source</a>
        project allowing you to display dynamic images of your Stackoverflow profile
        using a simple url.
      </p>

      <p class="fs-6 text-center">
        Several profile templates are available as well as rank badges for some
        popular technologies.
      </p>
    </div>
  </div>

  <Faq />
</section>

<style lang="scss">
  section {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -20vw;
      height: 100%;
      width: 140vw;
      background-color: #212529;
      z-index: -1;
    }
  }
</style>
