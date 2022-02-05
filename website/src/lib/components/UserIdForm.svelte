<script lang="ts">
  import { user } from '$lib/stores/user'
  import { MY_SO_ID } from '$lib/constants';

  export let userId
</script>

<div class="col-12 col-md-7 m-auto form-floating">
  <input
    type="text"
    class="form-control bg-dark text-light"
    id="soId"
    placeholder={MY_SO_ID.toString()}
    minlength={2}
    maxlength={20}
    required
    autocomplete="off"
    bind:value={userId}
  />
  <label for="soId" class="ms-2">Your SO identifier (ex: <code>{MY_SO_ID}</code>)</label>
</div>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    color: var(--bs-primary)!important;
}
</style>
