<script>
// This page exists only to force a redirect back to the homepage for 404s
export default {
  fetch ({ redirect }) {
    return redirect('/');
  }
};
</script>
