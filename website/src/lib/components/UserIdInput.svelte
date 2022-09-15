<script lang="ts">
  import Emoji from "svelte-emoji";
  import {
    MY_SO_ID,
    MY_SO_PROFILE_URL,
    SO_PROFILE_URL_REGEXP,
  } from "$lib/constants";
  import { getUserIdInProfileUrl } from "$lib/utils";

  export let userId: number = undefined;

  let isValid = true;
  let value = "";

  const onInputChange = (input: string): void => {
    if (input.length === 0) return;

    // eslint-disable-next-line
    // @ts-ignore
    const isInputNumber = !isNaN(input);

    if (isInputNumber) {
      userId = Number(input);
      isValid = true;
    } else {
      const inputMatch = input.match(SO_PROFILE_URL_REGEXP);

      if (inputMatch) {
        userId = getUserIdInProfileUrl(input);
      }

      isValid = !!inputMatch;
    }
  };

  $: onInputChange(value);
</script>

<div class="user-id">
  <input
    type="text"
    class="form-control bg-dark text-light"
    id="soId"
    placeholder={`Example: ${MY_SO_ID.toString()} or https://stackoverflow.com/users/8583669/johannchopin`}
    minlength={1}
    maxlength={100}
    required
    autocomplete="off"
    bind:value
  />
  {#if !isValid}
    <p
      class="invalid-feedback d-inline-block alert alert-danger p-1 w-fit-content text-dark"
      role="alert"
    >
      <Emoji symbol="⚠️" />
      Please enter a valid user id like
      <b class="fw-bold">{MY_SO_ID}</b>
      or a valid profile URL like <b class="fw-bold">{MY_SO_PROFILE_URL}</b>.
    </p>
  {/if}
</div>
