<script lang="ts">
  import { MY_SO_ID } from '$lib/constants';
  import QuestionIcon from './icons/Question.svelte';

  export let userId
</script>

<label for="soId" class="form-label d-flex align-items-center w-fit-content">
  <h2 class="m-0 p-0 fs-3">
    <span class="fw-bold text-primary">1.</span>
    Please enter your Stackoverflow identifier
  </h2>
  <a
    href="https://meta.stackoverflow.com/questions/281254/how-to-find-my-userid-in-stack-overflow"
    target="_blank"
    class="mx-3"
  >
    <span aria-hidden="true">
      <QuestionIcon />
    </span>
    <span class="visually-hidden">
      How to find my UserID in Stack Overflow
    </span>
  </a>
</label>

<input
  type="text"
  class="form-control w-50 bg-dark text-light"
  id="soId"
  placeholder={`Example: ${MY_SO_ID.toString()}`}
  minlength={2}
  maxlength={20}
  required
  autocomplete="off"
  bind:value={userId}
/>
