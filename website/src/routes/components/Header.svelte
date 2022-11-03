<script lang="ts">
  import Waves from "./Waves.svelte";
  import ProfileBig from "./images/profile-big.svg";
  import TagNodejs from "./images/tag-nodejs.svg";
  import TagDocker from "./images/tag-docker.svg";
  import TagCss from "./images/tag-css.svg";
  import ProfileSmall from "./images/profile-small.svg";

  let isProfileFocus = false;
  let isRankingBadgeFocus = false;

  const focusProfile = () => (isProfileFocus = true);
  const blurProfile = () => (isProfileFocus = false);

  const focusRankingBadge = () => (isRankingBadgeFocus = true);
  const blurRankingBadge = () => (isRankingBadgeFocus = false);
</script>

<header class="position-relative mt-md-5 pt-md-5">
  <Waves />

  <div class="row p-0 m-0 mt-5">
    <div class="col-12 col-md-8">
      <h1 class="mb-0 fs-2 fw-bold">
        <span
          class="mt-3 mb-3 fs-3 fw-bold d-inline-block d-md-none text-primary"
          >stackoverflow-readme-profile</span
        >
        Easily share your Stackoverflow's profile on your README
      </h1>

      <div class="d-flex mt-4">
        <a
          href="/profile"
          class="mx-1 btn btn-outline-primary rounded-3 text-decoration-none text-white"
          class:bg-primary={isProfileFocus}
          class:focus={isProfileFocus}
          class:border-primary={isProfileFocus}
          on:mouseenter={focusProfile}
          on:mouseleave={blurProfile}
        >
          <h2 class="fs-6 m-0">Generate your Profile</h2>
        </a>

        <a
          href="/tags-league"
          class="mx-1 btn btn-outline-primary rounded-3 text-decoration-none text-white"
          class:bg-primary={isRankingBadgeFocus}
          class:focus={isRankingBadgeFocus}
          class:border-primary={isRankingBadgeFocus}
          on:mouseenter={focusRankingBadge}
          on:mouseleave={blurRankingBadge}
        >
          <h2 class="fs-6 m-0">Get your ranking badge</h2>
        </a>
      </div>
    </div>

    <div class="col-12 col-md-4 d-flex flex-column mt-5 mt-md-4">
      <div class="d-flex flex-column">
        <img
          src={ProfileBig}
          id="profileBig"
          style="width: 300px;"
          alt="profile"
          class="m-1"
          class:focus={isProfileFocus}
          on:mouseenter={focusProfile}
          on:mouseleave={blurProfile}
        />
        <img
          src={ProfileSmall}
          id="profileSmall"
          style="width: 250px; margin-left: 80px"
          class="mt-2"
          alt="profile"
          class:focus={isProfileFocus}
          on:mouseenter={focusProfile}
          on:mouseleave={blurProfile}
        />
        <div class="d-flex mt-3 mb-1">
          <img
            src={TagNodejs}
            id="tagNode"
            class="tag me-2"
            alt="profile"
            class:focus={isRankingBadgeFocus}
            on:mouseenter={focusRankingBadge}
            on:mouseleave={blurRankingBadge}
          />
          <img
            src={TagDocker}
            id="tagDocker"
            style="transform: translateY(4px);"
            class="tag"
            alt="profile"
            class:focus={isRankingBadgeFocus}
            on:mouseenter={focusRankingBadge}
            on:mouseleave={blurRankingBadge}
          />
        </div>
        <img
          src={TagCss}
          id="tagCss"
          class="tag mt-2 ms-5"
          alt="profile"
          class:focus={isRankingBadgeFocus}
          on:mouseenter={focusRankingBadge}
          on:mouseleave={blurRankingBadge}
        />
      </div>
    </div>
  </div>
</header>

<style lang="scss">
  a.btn {
    border-width: 2px;
  }

  img {
    width: 300px;
    border: solid 2px transparent;
  }

  img.tag {
    width: 150px;
  }

  .focus {
    border: solid 2px #f48024;
    border-radius: 5px;
    box-shadow: 0 0 9px #f48024;
    transition: scale 0.3s;
    scale: 1.04;
  }

  header {
    min-height: 70vh;

    :global(svg) {
      width: 110vw;
      position: absolute;
      bottom: -2px;
      left: -10vw;
      z-index: -1;
    }
  }
</style>
