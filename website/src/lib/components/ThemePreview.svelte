<script>
  export let theme
  export let themeName
</script>

<div
  class={`template-preview position-relative border border-2 rounded ${$$props.class}`}
  style={`border-color: ${theme.colorPrimary}!important; background: ${theme.colorBg};`}
>
  <p class="m-1 fw-bold" style={`color: ${theme.colorText}`}>{themeName}</p>
  <span class="position-absolute bottom-0 end-0 m-2 rounded" style={`background: ${theme.colorLink};`}></span>
</div>

<style>
  .template-preview {
    height: 50px;
    width: 90px;
  }

  span {
    height: 5px;
    width: 25px
  }
</style>
