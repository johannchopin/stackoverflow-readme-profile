<script>
  import Question from "$lib/components/icons/Question.svelte";
</script>

<h2 class="d-flex align-content-center mt-5">
  <span class="me-2 text-primary">
    <Question />
  </span>
  FAQ
</h2>

<div class="accordion mt-2" id="accordion">
  <div class="accordion-item">
    <h3 class="accordion-header" id="connectedToSO">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#connectedToSOBody"
        aria-controls="connectedToSOBody"
      >
        Is this project linked to Stackoverflow?
      </button>
    </h3>
    <div
      id="connectedToSOBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="connectedToSO"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">nope</div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="whyUseIt">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#whyUseItBody"
        aria-controls="whyUseItBody"
      >
        Why would I use it?
      </button>
    </h3>
    <div
      id="whyUseItBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="whyUseIt"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">nope</div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="tagLeague">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#tagLeagueBody"
        aria-controls="tagLeagueBody"
      >
        What is the Tags League?
      </button>
    </h3>
    <div
      id="tagLeagueBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="tagLeague"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">nope</div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="computation">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#computationBody"
        aria-controls="computationBody"
      >
        How is the Tags League computed?
      </button>
    </h3>
    <div
      id="computationBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="computation"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">nope</div>
    </div>
  </div>
</div>

<style lang="scss">
  h2 button {
    font-weight: bold;
  }
</style>
