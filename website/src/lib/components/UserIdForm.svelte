<script lang="ts">
  import Emoji from 'svelte-emoji'
  import { MY_SO_ID, MY_SO_PROFILE_URL, SO_PROFILE_URL_REGEXP } from '$lib/constants';
  import { getUserIdInProfileUrl } from '$lib/utils';
  import QuestionIcon from './icons/Question.svelte';

  const FIND_ID_TITLE = 'How to find my UserID in Stack Overflow'

  export let userId
  let currentInput = ''
  let isInputInvalid = false

  const onInputChange = (input: string): void => {
    // eslint-disable-next-line
    // @ts-ignore
    const isInputNumber = !isNaN(input)

    if (isInputNumber) { 
      userId = Number(input)
      isInputInvalid = false
    }
    else {
      const inputMatch = input.match(SO_PROFILE_URL_REGEXP)

      if (inputMatch) {
        userId = getUserIdInProfileUrl(input)
      }

      isInputInvalid = !inputMatch
    }
  }

  $: onInputChange(currentInput)
</script>

<label for="soId" class="form-label d-flex align-items-center w-fit-content">
  <h2 class="m-0 p-0 fs-3">
    <span class="fw-bold text-primary">1.</span>
    Please enter your Stackoverflow identifier or profile URL
  </h2>
  <a
    href="https://meta.stackoverflow.com/questions/281254/how-to-find-my-userid-in-stack-overflow"
    target="_blank"
    class="mx-3"
    title={FIND_ID_TITLE}
    aria-label={FIND_ID_TITLE}
  >
    <span aria-hidden="true">
      <QuestionIcon />
    </span>
  </a>
</label>

<div>
  <input
    type="text"
    class="form-control bg-dark text-light"
    id="soId"
    placeholder={`Example: ${MY_SO_ID.toString()} or https://stackoverflow.com/users/8583669/johannchopin`}
    minlength={2}
    maxlength={100}
    required
    autocomplete="off"
    bind:value={currentInput}
  />
  {#if isInputInvalid}
    <p class="invalid-feedback d-inline-block alert alert-danger p-1 w-fit-content text-dark" role="alert">
      <Emoji symbol="⚠️" />
      Please enter a valid user id like
      <b class="fw-bold">{MY_SO_ID}</b> 
      or a valid profile URL like <b class="fw-bold">{MY_SO_PROFILE_URL}</b>.
    </p>
  {/if}
</div>

<style lang="scss">
  @import '../../../node_modules/bootstrap/scss/functions';
  @import '../../../node_modules/bootstrap/scss/variables';
  @import '../../../node_modules/bootstrap/scss/mixins';

  @include media-breakpoint-up(md) {
    input {
      width: 50%!important;
    }
  }
</style>