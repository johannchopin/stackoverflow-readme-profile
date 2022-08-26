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

  const startComputation = async () => {
    const res = await fetch(`${API_BASEURL}/badges-league/compute`, {
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

<h1>Badges League admin zone</h1>

<div class="accordion mt-5" id="accordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
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
      aria-labelledby="headingOne"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <form class="row g-3" on:submit|preventDefault={startComputation}>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">SEDE Cookie</label>
            <input type="text" class="form-control" bind:value={cookie} />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">API token</label>
            <input type="password" class="form-control" bind:value={apiToken} />
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
