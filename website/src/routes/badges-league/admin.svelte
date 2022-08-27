<script>
  import { API_BASEURL } from "$lib/constants";

  let apiToken;
  let cookie;

  const getBody = () => {
    return JSON.stringify({ cookie });
  };

  const getHeaders = () => {
    return new Headers({
      authorization: apiToken,
      "Content-Type": "application/json",
    });
  };

  const computeBadgesToUseInLeague = async () => {
    const res = await fetch(`${API_BASEURL}/badges-league/badges`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (res.status === 403) {
      alert("invalid admin access");
      return;
    }

    alert("Badges updated!");
  };

  const startLeagueComputation = async () => {
    const res = await fetch(`${API_BASEURL}/badges-league`, {
      method: "POST",
      headers: getHeaders(),
      body: getBody(),
    });

    if (res.status === 403) {
      alert("invalid admin access");
      return;
    } else if (res.status === 400) {
      alert("Invalid SEDE cookie provided");
      return;
    }

    alert("Success!");
  };
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Badges League admin zone</h1>

<div class="accordion mt-5" id="accordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="computePopularTagsHeader">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#computePopularTags"
        aria-controls="computePopularTags"
      >
        Compute Badges to be used in the league
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
          on:submit|preventDefault={computeBadgesToUseInLeague}
        >
          <div class="col-md-6">
            <label for="apiTokenPopularTags" class="form-label">API token</label
            >
            <input
              type="password"
              id="apiTokenPopularTags"
              class="form-control"
              bind:value={apiToken}
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary" disabled={!apiToken}
              >Start computation</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="computeLeagueCalculationHeader">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#computeLeagueCalculation"
        aria-controls="computeLeagueCalculation"
      >
        Compute Badges League
      </button>
    </h2>
    <div
      id="computeLeagueCalculation"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="computeLeagueCalculationHeader"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <form class="row g-3" on:submit|preventDefault={startLeagueComputation}>
          <div class="col-md-6">
            <label for="sedeCookie" class="form-label">SEDE Cookie</label>
            <input
              type="text"
              id="sedeCookie"
              class="form-control"
              bind:value={cookie}
            />
          </div>
          <div class="col-md-6">
            <label for="apiTokenCompute" class="form-label">API token</label>
            <input
              type="password"
              id="apiTokenCompute"
              class="form-control"
              bind:value={apiToken}
            />
          </div>
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary"
              disabled={!cookie || !apiToken}>Start computation</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
