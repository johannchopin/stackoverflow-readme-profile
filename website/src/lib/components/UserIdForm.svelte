<script lang="ts">
  import { user } from '$lib/stores/user'
  import { MY_SO_ID } from '$lib/constants';

  let userId
  const onSubmit = (): void => {
    console.log(userId)
    $user.id = userId
  }
</script>

<form class="row mx-md-5" on:submit|preventDefault={onSubmit}>
  <div class="col-12 col-md-7 form-floating">
    <input
      type="text"
      class="form-control bg-dark text-light"
      id="soId"
      placeholder={MY_SO_ID.toString()}
      minlength={2}
      maxlength={20}
      required
      bind:value={userId}
    />
    <label for="soId" class="ms-2">Your SO identifier (ex: <code>{MY_SO_ID}</code>)</label>
  </div>

  <button
    class="col-12 col-md-auto btn btn-outline-primary mt-3 mt-md-0"
    type="submit"
  >
    Get my profile
  </button>
</form>
