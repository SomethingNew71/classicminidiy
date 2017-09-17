<template>
  <section class="manuals pb-5">
    <v-layout wrap>
      <v-flex xs12 offset-xs1 class="pt-2">
        <v-btn dark primary nuxt to="/" >
          <v-icon left dark>fa-arrow-left</v-icon>
          Back to Get Started
        </v-btn>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <img src="icons/Multicolor/SVG/Round Icons/Checklist.svg" alt="" width="70px" class="pb-3">
        <p class="subheading grey--text lighten-2 ma-0">Currated list of Classic Mini DIY recommended manuals</p>
        <h2 class="black--text darken-3">Workshop Manuals</h2>
      </v-flex>
      <v-flex xs10 offset-xs1>
        <v-divider></v-divider>
      </v-flex>

      <v-tabs dark fixed centered>
        <v-tabs-bar class="primary">
          <v-tabs-slider class="white"></v-tabs-slider>
          <v-tabs-item :href="'#manuals'">
            Manuals
          </v-tabs-item>
          <v-tabs-item :href="'#technical'">
            Technical
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content :id="'manuals'">
            <v-container>
              <v-layout row wrap class="manuals-section">
                <v-flex xs12 sm6 md4 lg3 class="pa-2" :key="index" v-for="(book, index) in books.workshop">
                  <v-card hover class="">
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs7>
                          <div>
                            <div class="pl-0 subheader">{{book.name}}</div>
                            <div class="caption">Written by {{book.author}}</div>
                          </div>
                          <v-card-actions class="pl-0 mt-2">
                            <v-btn small :href="book.urlAmazon" target="_blank" tag='a' v-if="book.urlAmazon" class="amazon ml-0" dark>Amazon</v-btn>
                          </v-card-actions>
                          <v-card-actions class="pl-0 pt-0 ml-0">
                            <v-btn small :href="book.urlSeven" target="_blank" tag='a' v-if="book.urlSeven" class="ml-0 red seven-mini" dark>Seven Mini</v-btn>
                          </v-card-actions>
                        </v-flex>
                        <v-flex xs5>
                          <v-card-media
                            :src="book.imgSource"
                            height="150px"
                            contain
                          >
                          </v-card-media>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tabs-content>
          <v-tabs-content :id="'technical'">
            <v-container>
              <v-layout row wrap class="technical-section">
                <v-flex xs12 sm6 md4 lg3 class="pa-2" :key="index" v-for="(book, index)  in books.technical">
                  <v-card hover class="">
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs7>
                          <div>
                            <div class="pl-0 subheader">{{book.name}}</div>
                            <div class="caption">Written by {{book.author}}</div>
                          </div>
                          <v-card-actions class="pl-0 mt-2">
                            <v-btn small :href="book.urlAmazon" target="_blank" tag='a' v-if="book.urlAmazon" class="amazon ml-0" dark>Amazon</v-btn>
                          </v-card-actions>
                          <v-card-actions class="pl-0 pt-0 ml-0">
                            <v-btn small :href="book.urlSeven" target="_blank" tag='a' v-if="book.urlSeven" class="ml-0 red seven-mini" dark>Seven Mini</v-btn>
                          </v-card-actions>
                        </v-flex>
                        <v-flex xs5>
                          <v-card-media
                            :src="book.imgSource"
                            height="150px"
                            contain
                          >
                          </v-card-media>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-layout>
    <v-layout row>
      <v-flex xs10 offset-xs1 class="pt-4">
        <v-card>
          <v-card-text>
            <!-- CMDIY - Manuals -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-0523971861051053"
                 data-ad-slot="1008138191"
                 data-ad-format="auto"></ins>
            <script>
            /* eslint-disable */
            (adsbygoogle = window.adsbygoogle || []).push({});
            /* eslint-enable */
            </script>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
  export default {
    data: function () {
      return {
        books: {
          workshop: {
            1: {
              'name': 'Haynes Mini - 1959 to 1969',
              'author': 'John Haynes',
              'urlSeven': 'http://www.7ENT.com/products/haynes-repair-manual-59-69-sbk0002.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2s8NTEJ',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0856965278&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Haynes-Mini-Owners-Workshop-Manual/dp/0856965278/ref=as_li_ss_il?ie=UTF8&qid=1497403488&sr=8-4&keywords=Mini+(1959+-+1969)+haynes&linkCode=li3&tag=classicmini0a-20&linkId=d4dedc0e81a46e63e0567c7190a93ad1" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0856965278&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=0856965278" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=0856965278&asins=0856965278&linkId=0fee8d487befa7f2732d6a37a5443af4&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            2: {
              'name': 'Haynes Mini - 1969 to 2001',
              'author': 'John S Mead',
              'urlSeven': 'http://www.7ENT.com/products/haynes-repair-manual-1969-2001-sbk0023.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2slJsZ8',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0857339656&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Haynes-Registration-Service-Repair-Manual/dp/0857339656/ref=as_li_ss_il?ie=UTF8&qid=1497396942&sr=8-3&keywords=Mini+Repair+manual&linkCode=li3&tag=classicmini0a-20&linkId=b2121622386f905e03457864c07ce73b" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0857339656&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=0857339656" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=0857339656&asins=0857339656&linkId=fab209b229ca9bb8fe394d55c12c46c4&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            3: {
              'name': 'Mini Workshop Manual (Official Workshop Manuals)',
              'author': 'Brooklands Books Ltd',
              'urlSeven': '',
              'urlAmazon': 'http://amzn.to/2rxfPQB',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1855201488&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Workshop-Manual-Official-Manuals/dp/1855201488/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=1855201488&pd_rd_r=THVAMSQ4PVRSSBE7STXP&pd_rd_w=zbyWB&pd_rd_wg=Idzj1&psc=1&refRID=THVAMSQ4PVRSSBE7STXP&linkCode=li3&tag=classicmini0a-20&linkId=323598647a4604ae498f65df80eaa06d" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1855201488&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1855201488" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1855201488&asins=1855201488&linkId=1ca1e127ecc3b829279b7f70ae631f29&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            4: {
              'name': 'Mini: Purchase and Restoration Guide',
              'author': 'Lindsay Porter',
              'urlSeven': 'http://www.7ENT.com/products/haynes-mini-restoration-manual-sbk0044.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2smk1Xs',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859604404&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Purchase-Restoration-Lindsay-Porter/dp/1859604404/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-1&keywords=classic+mini+haynes&linkCode=li3&tag=classicmini0a-20&linkId=6c84288fe26c533e4388c10980311786" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859604404&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1859604404" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1859604404&asins=1859604404&linkId=bca8e771279b2d8555ded8def5b7bcda&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            5: {
              'name': 'Mini Renovation Manual - 1986 to 2000',
              'author': 'Paul Hardiman',
              'urlSeven': 'http://www.7ENT.com/products/mini-renovation-manual-1986-2000-sbk0209.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2slQ6P1',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1844254240&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Renovation-Manual-1986-2000-Manuals/dp/1844254240/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-3&keywords=classic+mini+haynes&linkCode=li3&tag=classicmini0a-20&linkId=3b3d7ff756af1373ed670b266e5bae5e" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1844254240&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1844254240" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1844254240&asins=1844254240&linkId=152262a25379210bd63c9252991c6079&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            6: {
              'name': 'Mini Performance Manual',
              'author': 'Tim Mundy',
              'urlSeven': 'http://www.7ENT.com/products/mini-performance-manual-sbk0223.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2rp5Hho',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859608809&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Performance-Manual-Haynes/dp/1859608809/ref=as_li_ss_il?ie=UTF8&qid=1497404189&sr=8-4&keywords=classic+mini+haynes&linkCode=li3&tag=classicmini0a-20&linkId=264ff7a930a5319d1d8738b85ca4b3ef" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859608809&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1859608809" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1859608809&asins=1859608809&linkId=e9aaa6f15d1261c31ebbb4d8482cdfeb&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            7: {
              'name': 'Mini: The Essential Buyer\'s Guide',
              'author': 'Mark Paxton',
              'urlSeven': '',
              'urlAmazon': 'http://amzn.to/2rimn6n',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842049&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Mini-Essential-Buyers-Mark-Paxton/dp/1845842049/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=1845842049&pd_rd_r=THVAMSQ4PVRSSBE7STXP&pd_rd_w=U0WnN&pd_rd_wg=Idzj1&psc=1&refRID=THVAMSQ4PVRSSBE7STXP&linkCode=li3&tag=classicmini0a-20&linkId=ef34c71b59ab81868c4f22b6631d25d2" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842049&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1845842049" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1845842049&asins=1845842049&linkId=feeb56f849bfe1bdcdc11774fb3ccd3b&show_border=true&link_opens_in_new_window=true"></iframe>'
            }
          },
          technical: {
            1: {
              'name': 'Anatomy of the Classic Mini',
              'author': 'Mark Huthert',
              'urlSeven': '',
              'urlAmazon': 'http://amzn.to/2smpg9p',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842235&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Anatomy-Classic-Mini-definitive-interchangeability/dp/1845842235/ref=as_li_ss_il?ie=UTF8&qid=1497404041&sr=8-1&keywords=classic+mini+books&linkCode=li3&tag=classicmini0a-20&linkId=35f89a9bf08117dd6821420954873b44" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845842235&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1845842235" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1845842235&asins=1845842235&linkId=44ef5b792ac9a01ba86686b8bbab6fd1&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            2: {
              'name': 'Tuning the A-Series Engine',
              'author': 'David Vizard',
              'urlSeven': 'http://www.7ENT.com/products/tuning-the-a-series-engine-sbk0001.html?af=cmdiy1959',
              'urlAmazon': 'http://amzn.to/2t3cRoR',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859606202&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Tuning-Engine-Definitive-Performance-Economy/dp/1859606202/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=1859606202&pd_rd_r=THVAMSQ4PVRSSBE7STXP&pd_rd_w=U0WnN&pd_rd_wg=Idzj1&psc=1&refRID=THVAMSQ4PVRSSBE7STXP&linkCode=li3&tag=classicmini0a-20&linkId=1cfae556a49124602a87095d62b176f1" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1859606202&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1859606202" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1859606202&asins=1859606202&linkId=6af83734a1ba68448f772985f0bf49a9&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            3: {
              'name': 'SU Carburetters Tuning Tips And Techniques',
              'author': 'R.M. Clarke',
              'urlSeven': '',
              'urlAmazon': 'http://amzn.to/2to2D1D',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1855202557&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/SU-Carburetters-Tuning-Tips-Techniques/dp/1855202557/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=1855202557&pd_rd_r=ADRNVNTZ6VVVCTW03KZN&pd_rd_w=my5cl&pd_rd_wg=J5SNd&psc=1&refRID=ADRNVNTZ6VVVCTW03KZN&linkCode=li3&tag=classicmini0a-20&linkId=57ccd821731bd290ed006d2d8e124aee" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1855202557&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1855202557" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1855202557&asins=1855202557&linkId=8d2428ad61aa6d9e2e23d0d1895eb935&show_border=true&link_opens_in_new_window=true"></iframe>'
            },
            4: {
              'name': 'The Ultimate Mini Restoration Manual',
              'author': 'Iain Ayre',
              'urlSeven': '',
              'urlAmazon': 'http://amzn.to/2sqcmqV',
              'imgSource': '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845841166&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20',
              'imgFrame': '<a href="https://www.amazon.com/Ultimate-Mini-Restoration-Manual-Overpower/dp/1845841166/ref=as_li_ss_il?_encoding=UTF8&pd_rd_i=1845841166&pd_rd_r=ADRNVNTZ6VVVCTW03KZN&pd_rd_w=my5cl&pd_rd_wg=J5SNd&psc=1&refRID=ADRNVNTZ6VVVCTW03KZN&linkCode=li3&tag=classicmini0a-20&linkId=ce31d3118c5dbf6c4201ec39ea42650f" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1845841166&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=classicmini0a-20" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=classicmini0a-20&l=li3&o=1&a=1845841166" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
              'fullFrame': '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=classicmini0a-20&marketplace=amazon&region=US&placement=1845841166&asins=1845841166&linkId=24d4b23d56fac69af570e83592e8c682&show_border=true&link_opens_in_new_window=true"></iframe>'
            }
          }
        }
      };
    }
  };
</script>
<style lang="scss">
.manuals {
  .subheader {
    height: inherit;
  }
  .hero {
    background-image: url('/pages/manuals/manuals4.jpg') !important;
    background-size: cover;
    min-height: 15rem;
  }

  .card__media__background {
    background-position: center !important;
  }

  .amazon {
    background-color: #FF9900 !important;
  }

  .image-section {
    background-color: #F1F5F7;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .manuals-section,
  .technical-section {
    .card {
      height: 100% !important;
    }
  }
}
</style>
