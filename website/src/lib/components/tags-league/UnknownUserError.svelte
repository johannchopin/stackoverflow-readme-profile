<script>
  import Error from "../Error.svelte";
</script>

<Error title="User not in league">
  <div class="row justify-content-center">
    <p class="col-12 col-md-10 fs-6 text-center">
      This user doesn't have a sufficient score to be part of the Tags-league or
      isn't a StackOverflow member!
    </p>

    <div class="d-flex justify-content-center mt-3">
      <a href="/tags-league" class="btn btn-outline-primary">
        Back to the tags-league
      </a>
    </div>
  </div>
</Error>
