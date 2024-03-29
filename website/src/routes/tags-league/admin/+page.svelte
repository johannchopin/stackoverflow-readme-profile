<script lang="ts">
  import Question from "$lib/components/icons/Question.svelte";
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Login from "$lib/components/Login.svelte";
  import { API_BASEURL } from "$lib/constants";
  import { onMount } from "svelte";
  import ComputedTagsLoader from "./components/ComputedTagsLoader.svelte";
  import Logs from "./components/Logs.svelte";

  let apiToken;
  let cookie;
  let tags: string[];
  let computedTags: string[];
  let isComputingLeague = false;
  let seeLogs = false;
  let lastLeagueComputation: Date;

  let computationStatusInterval;

  const startComputationStatusInterval = (): void => {
    computationStatusInterval = setInterval(() => {
      getComputationStatus();
    }, 5000);
  };

  const getBody = () => {
    return JSON.stringify({ cookie });
  };

  const getHeaders = () => {
    return new Headers({
      authorization: apiToken,
      "Content-Type": "application/json",
    });
  };

  const getComputationStatus = async (): Promise<void> => {
    const res = await fetch(`${API_BASEURL}/tags-league/status`);
    const { status, lastComputation, computedTagNames } = await res.json();

    isComputingLeague = status === "busy";
    computedTags = computedTagNames;

    if (status === "available" && computationStatusInterval) {
      clearInterval(computationStatusInterval);
      computationStatusInterval = undefined;
    }

    if (status === "busy" && !computationStatusInterval) {
      startComputationStatusInterval();
    }

    if (lastComputation) lastLeagueComputation = new Date(lastComputation);
  };

  const computeTagsToUseInLeague = async () => {
    const res = await fetch(`${API_BASEURL}/tags-league/tags`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (res.status === 403) {
      alert("invalid admin access");
      return;
    }

    tags = await res.json();

    alert("Tags updated!");
  };

  const cancelTagsComputation = async (): Promise<void> => {
    const res = await fetch(`${API_BASEURL}/tags-league/cancel`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (res.status === 200) {
      isComputingLeague = false;
      alert("Computation canceled");
      return;
    }

    isComputingLeague = false;
    alert("Something went wrong!");
  };

  const startLeagueComputation = async () => {
    isComputingLeague = true;

    const res = await fetch(`${API_BASEURL}/tags-league`, {
      method: "POST",
      headers: getHeaders(),
      body: getBody(),
    });

    if (res.status === 403) {
      alert("invalid admin access");
      isComputingLeague = false;
      return;
    } else if (res.status === 400) {
      alert("Invalid SEDE cookie provided");
      isComputingLeague = false;
      return;
    } else if (res.status === 409) {
      alert("Currently computing");
      return;
    }

    startComputationStatusInterval();

    alert("Success!");
  };

  const getTags = async () => {
    tags = await (await fetch(`${API_BASEURL}/tags-league/tags`)).json();
  };

  onMount(async () => {
    getComputationStatus();
    getTags();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Tags League admin zone</h1>

{#if lastLeagueComputation}
  <LastUpdate date={lastLeagueComputation} />
{/if}

{#if apiToken}
  <div class="accordion mt-1" id="accordion">
    <div class="accordion-item text-white">
      <h2 class="accordion-header" id="computePopularTagsHeader">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#computePopularTags"
          aria-controls="computePopularTags"
        >
          Compute Tags to be used in the league
        </button>
      </h2>
      <div
        id="computePopularTags"
        class="accordion-collapse collapse bg-body"
        aria-labelledby="computePopularTagsHeader"
        data-bs-parent="#accordion"
      >
        <div class="accordion-body">
          <form
            class="row g-3"
            on:submit|preventDefault={computeTagsToUseInLeague}
          >
            <div class="col-12">
              <button type="submit" class="btn btn-primary"
                >Start computation</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="accordion-item text-white">
      <h2 class="accordion-header" id="computeLeagueCalculationHeader">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#computeLeagueCalculation"
          aria-controls="computeLeagueCalculation"
        >
          Compute Tags League
        </button>
      </h2>
      <div
        id="computeLeagueCalculation"
        class="accordion-collapse collapse bg-body"
        aria-labelledby="computeLeagueCalculationHeader"
        data-bs-parent="#accordion"
      >
        <div class="accordion-body">
          <form
            class="row g-3"
            on:submit|preventDefault={startLeagueComputation}
          >
            <div class="col-md-6">
              <div class="d-flex">
                <label for="sedeCookie" class="form-label">SEDE Cookie</label>
                <a
                  class="ms-2"
                  data-bs-toggle="collapse"
                  href="#collapseSEDEInfo"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseSEDEInfo"
                >
                  <Question />
                </a>
              </div>

              <div class="collapse" id="collapseSEDEInfo">
                <div class="card card-body bg-dark">
                  <p>
                    To get a SEDE cookie go to a SEDE page like
                    <a
                      href="https://data.stackexchange.com/stackoverflow/query/1631255/check-auth-cookie"
                      target="_blank"
                    >
                      this one
                    </a>. Then run a query and get the cookie from the query
                    request header
                  </p>
                </div>
              </div>
              <input
                type="text"
                id="sedeCookie"
                class="form-control"
                placeholder="OptanonConsent=datestamp=..."
                bind:value={cookie}
              />
            </div>

            {#if isComputingLeague}
              <div class="col-12">
                <ComputedTagsLoader {tags} {computedTags} />
              </div>
            {/if}

            <div class="col-12 d-flex">
              <button
                type="submit"
                class="btn btn-primary"
                disabled={!cookie || isComputingLeague}
              >
                {#if isComputingLeague}
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                {:else}
                  Start computation
                {/if}
              </button>
              {#if isComputingLeague}
                <button
                  type="button"
                  class="btn btn-danger ms-2"
                  on:click={cancelTagsComputation}>Cancel</button
                >
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="accordion-item text-white">
      <h3 class="accordion-header" id="checkLogs">
        <button
          class="accordion-button collapsed text-black"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          data-bs-target="#checkLogsBody"
          aria-controls="checkLogsBody"
        >
          Consult the logs
        </button>
      </h3>
      <div
        id="checkLogsBody"
        class="accordion-collapse collapse bg-body"
        aria-labelledby="checkLogs"
        data-bs-parent="#accordion"
      >
        <div class="accordion-body">
          {#if seeLogs}
            <Logs {apiToken} />
          {:else}
            <button class="btn btn-primary" on:click={() => (seeLogs = true)}>
              See logs
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{:else}
  <Login bind:validToken={apiToken} />
{/if}
