<script>
  import Question from "$lib/components/icons/Question.svelte";
  import { NEW_QUESTION_ISSUE_LINK } from "$lib/constants";
  import FaqAccordion from "./FaqAccordion.svelte";
</script>

<div class="row justify-content-center">
  <div class="col-md-10 col-l-6">
    <h2 class="d-flex align-content-center mt-5">
      <span class="me-2 text-primary">
        <Question />
      </span>
      FAQ
    </h2>

    <FaqAccordion />

    <div class="d-flex justify-content-center my-4">
      <a
        href={NEW_QUESTION_ISSUE_LINK}
        target="_blank"
        class="btn btn-outline-light btn-sm m-auto"
      >
        Ask a question
      </a>
    </div>
  </div>
</div>

<style lang="scss">
</style>
