<template>
  <div>
    <client-only>
      <!-- Load Facebook SDK for JavaScript -->
      <div id="fb-root"></div>
      <script type="text/javascript">
        window.fbAsyncInit = function () {
          FB.init({
            xfbml: true,
            version: 'v10.0',
          });
        };

        (function (d, s, id) {
          var js,
            fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.src =
            'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      </script>

      <!-- Your Chat Plugin code -->
      <div
        class="fb-customerchat"
        attribution="setup_tool"
        page_id="615159745295369"
      ></div>
    </client-only>
  </div>
</template>
