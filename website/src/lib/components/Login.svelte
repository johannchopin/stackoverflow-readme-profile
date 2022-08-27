<script lang="ts">
  import { API_BASEURL } from "$lib/constants";

  import { onMount } from "svelte";
  import Person from "./icons/Person.svelte";

  const API_TOKEN_KEY = "API_TOKEN";

  export let validToken: string;
  let token: string;

  const checkToken = async (): Promise<void> => {
    const valid = await isTokenValid(token);

    if (valid) {
      validToken = token;
      localStorage.setItem(API_TOKEN_KEY, token);
    } else {
      alert("Invalid password!");
    }
  };

  const isTokenValid = async (token: string): Promise<boolean> => {
    const res = await fetch(`${API_BASEURL}/badges-league/auth`, {
      headers: new Headers({
        authorization: token,
      }),
    });

    return res.status === 200;
  };

  const checkIfLoggedIn = async (): Promise<void> => {
    const storedToken = localStorage.getItem(API_TOKEN_KEY);

    if (storedToken) {
      if (await isTokenValid(storedToken)) {
        validToken = storedToken;
      } else {
        localStorage.removeItem(API_TOKEN_KEY);
      }
    }
  };

  onMount(() => {
    checkIfLoggedIn();
  });
</script>

<form class="row g-3" on:submit|preventDefault={checkToken}>
  <div class="input-group mt-3 w-25">
    <input
      type="password"
      class="form-control bg-dark text-white"
      placeholder="Password"
      aria-label="Password"
      bind:value={token}
    />
    <button class="btn btn-outline-primary" type="submit"
      ><Person /> Log In</button
    >
  </div>
</form>
