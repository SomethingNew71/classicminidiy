<template>
  <section class="manuals">
    <div class="hero is-dark is-medium is-bold is-full-width">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="title">Technical Literature</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container manual-container">
      <div class="tabs">
        <ul>
          <li v-bind:class="{ 'is-active': manualsActive }" class="manuals">
            <a v-on:click="manualsToggle" >
              <span class="icon is-small"><i class="fa fa-black-tie"></i></span>
              <span>Manuals</span>
            </a>
          </li>
          <li v-bind:class="{ 'is-active': techActive }" class="technical">
            <a v-on:click="techToggle">
              <span class="icon is-small"><i class="fa fa-wrench"></i></span>
              <span>Tech Reference</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="columns is-multiline manuals" v-bind:class="{ 'is-active': manualsActive }">
        <div class="column is-3" v-for="book in books.workshop">
          <div class="card">
            <div class="card-image">
              <figure class="image ">
                <img :src='book.imgSource'  alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">{{book.name}}</p>
                  <p class="subtitle is-6">by {{book.author}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item amazon" :href='book.urlAmazon'><span class="fa fa-amazon"></span>Amazon</a>
              <a class="card-footer-item seven-ent"><span class="fa fa-car"></span>Seven Mini</a>
            </footer>
          </div>
        </div>
      </div>
      <div class="columns is-multiline technical" v-bind:class="{ 'is-active': techActive }">
        <div class="column is-3" v-for="book in books.technical">
          <div class="card">
            <div class="card-image">
              <figure class="image ">
                <img :src='book.imgSource'  alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">{{book.name}}</p>
                  <p class="subtitle is-6">by {{book.author}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item amazon" :href='book.urlAmazon'><span class="fa fa-amazon"></span>Amazon</a>
              <a class="card-footer-item seven-ent"><span class="fa fa-car"></span>Seven Mini</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data: function () {
      return {
        manualsActive: true,
        techActive: false,
        books: {
          workshop: {
            title: 'Workshop Manuals',
            '1': {
              'name': 'Haynes Mini - 1959 to 1969',
              'author': 'John Haynes',
              'urlAmazon': 'http://amzn.to/2s8NTEJ',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0856965278&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Haynes-Mini-Owners-Workshop-Manual/dp/0856965278/ref=as_li_ss_il?ie=UTF8&qid=1497403488&sr=8-4&keywords=Mini+(1959+-+1969)+haynes&linkCode=li3&tag=classicminidi-20&linkId=d4dedc0e81a46e63e0567c7190a93ad1" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0856965278&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li3&o=1&a=0856965278" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=0856965278&asins=0856965278&linkId=0fee8d487befa7f2732d6a37a5443af4&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '2': {
              'name': 'Haynes Mini - 1969 to 2001',
              'author': 'John S Mead',
              'urlAmazon': 'http://amzn.to/2slJsZ8',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0857339656&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Haynes-Registration-Service-Repair-Manual/dp/0857339656/ref=as_li_ss_il?ie=UTF8&qid=1497396942&sr=8-3&keywords=Mini+Repair+manual&linkCode=li3&tag=classicminidi-20&linkId=b2121622386f905e03457864c07ce73b" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0857339656&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li3&o=1&a=0857339656" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=0857339656&asins=0857339656&linkId=fab209b229ca9bb8fe394d55c12c46c4&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '3': {
              'name': 'Mini: Purchase and Restoration Guide',
              'author': 'Lindsay Porter',
              'urlAmazon': 'http://amzn.to/2smk1Xs',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859604404&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Purchase-Restoration-Lindsay-Porter/dp/1859604404/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-1&keywords=classic+mini+haynes&linkCode=li3&tag=classicminidi-20&linkId=6c84288fe26c533e4388c10980311786" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859604404&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li3&o=1&a=1859604404" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=1859604404&asins=1859604404&linkId=bca8e771279b2d8555ded8def5b7bcda&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '4': {
              'name': 'Mini Renovation Manual - 1986 to 2000',
              'author': 'Paul Hardiman',
              'urlAmazon': 'http://amzn.to/2slQ6P1',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1844254240&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Renovation-Manual-1986-2000-Manuals/dp/1844254240/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-3&keywords=classic+mini+haynes&linkCode=li3&tag=classicminidi-20&linkId=3b3d7ff756af1373ed670b266e5bae5e" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1844254240&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li3&o=1&a=1844254240" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=1844254240&asins=1844254240&linkId=152262a25379210bd63c9252991c6079&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '5': {
              'name': 'Mini Performance Manual',
              'author': 'Tim Mundy',
              'urlAmazon': 'http://amzn.to/2rp5Hho',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859608809&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Performance-Manual-Haynes/dp/1859608809/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-4&keywords=classic+mini+haynes&linkCode=li2&tag=classicminidi-20&linkId=d4d3ae43b65fdde47624a6282b38a1eb" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859608809&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li2&o=1&a=1859608809" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=1859608809&asins=1859608809&linkId=e9aaa6f15d1261c31ebbb4d8482cdfeb&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '6': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '7': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '8': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '9': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '10': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '11': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '12': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '13': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '14': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '15': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '16': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '17': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '18': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '19': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '20': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '21': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '22': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            }
          },
          technical: {
            title: 'Technical Reference',
            '1': {
              'name': 'Anatomy of the Classic Mini',
              'author': 'Mark Huthert',
              'urlAmazon': 'http://amzn.to/2smpg9p',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842235&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20',
              'imgFrame': '<a href="https://www.amazon.com/Anatomy-Classic-Mini-definitive-interchangeability/dp/1845842235/ref=as_li_ss_il?ie=UTF8&qid=1497404041&sr=8-1&keywords=classic+mini+books&linkCode=li3&tag=classicminidi-20&linkId=35f89a9bf08117dd6821420954873b44" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842235&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li3&o=1&a=1845842235" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=1845842235&asins=1845842235&linkId=44ef5b792ac9a01ba86686b8bbab6fd1&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '2': {
              'name': 'Haynes Mini 1969 to 2001 Up to X Registration',
              'author': 'John S Mead',
              'urlAmazon': 'http://amzn.to/2slJsZ8',
              'imgSource': 'https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li2&o=1&a=0857339656',
              'imgFrame': '<a href="https://www.amazon.com/Haynes-Registration-Service-Repair-Manual/dp/0857339656/ref=as_li_ss_il?ie=UTF8&qid=1497396942&sr=8-3&keywords=Mini+Repair+manual&linkCode=li2&tag=classicminidi-20&linkId=29cb8101865884a6a592cb9dfcdb2402" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0857339656&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicminidi-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicminidi-20&l=li2&o=1&a=0857339656" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicminidi-20&marketplace=amazon&region=US&placement=0857339656&asins=0857339656&linkId=fab209b229ca9bb8fe394d55c12c46c4&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            '3': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '4': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '5': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '6': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '7': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '8': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '9': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '10': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '11': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '12': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '13': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '14': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '15': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '16': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '17': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '18': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '19': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '20': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '21': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            },
            '22': {
              'name': 'BOOK NAME GOES HERE',
              'author': '',
              'urlAmazon': '',
              'imgSource': '',
              'imgFrame': '',
              'fullFrame': ''
            }
          }
        }
      };
    },
    methods: {
      manualsToggle: function () {
        this.manualsActive = true;
        this.techActive = false;
      },
      techToggle: function () {
        this.manualsActive = false;
        this.techActive = true;
      }
    }
  };
</script>
<style lang="scss" src="./manuals.scss"></style>
