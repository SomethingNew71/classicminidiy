<template>
  <section class="main-content full-width">
    <nuxt />
    <footer class="footer has-background-dark has-text-light">
      <div class="content has-text-centered">
        <p>
          <strong class="has-text-light">Classic Mini DIY</strong> by <a class="has-text-info" href="https://github.com/SomethingNew71">Cole Gentry</a>. The source code is licensed
          <a class="has-text-info" href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a class="has-text-info" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
        <p>Sign up for the Classic Mini DIY Newsletter</p>
        <div>
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
            <form
              id="mc-embedded-subscribe-form"
              action="https://classicminidiy.us16.list-manage.com/subscribe/post?u=8c4cae17c7a50111c3fe1a26a&amp;id=6a5daeee77"
              method="post"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <input
                  id="mce-EMAIL"
                  type="email"
                  value=""
                  name="EMAIL"
                  class="email"
                  placeholder="Email Address"
                  required
                >
                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                  <input type="text" name="b_8c4cae17c7a50111c3fe1a26a_6a5daeee77" tabindex="-1" value="">
                </div>
                <div class="clear">
                  <input
                    id="mc-embedded-subscribe"
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    class="button"
                  >
                </div>
              </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
        </div>
      </div>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
  #mc_embed_signup {
    form {
      padding: 0;
      input {
        height: inherit;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        max-width: 400px;
      }
      #mc-embedded-subscribe {
        max-width: 100px;
      }
    }
  }
</style>
