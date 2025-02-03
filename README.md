<a id="readme-top"></a>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/somethingnew71/classicminidiy">
    <img src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/CMDIY-Green.jpg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Classic Mini DIY</h3>

  <p align="center">
    Welcome to the Classic Mini DIY project! This project is a collection of resources for the classic Mini enthusiast. Whether you're a seasoned Mini owner or just getting started, you'll find something here to help you with your project. All of our projects and sites are free, and open source. This means they will be accessible by anyone for as long as the internet exists. We hope you find something useful here, and if you do, please consider contributing to the project. We're always looking for new ideas and ways to improve the site. Thanks for stopping by!
    <br />
    <br />
    <a href="https://classicminidiy.com"><strong>Explore the website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/somethingnew71/classicminidiy/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/somethingnew71/classicminidiy/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
    &middot;
    <a href="https://patreon.com/classicminidiy">Support Server Costs</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://classicminidiy.com)

The intention of this website is to be both a comprhensive toolkit of information while working on your Classic Mini, but also to be a permanent archive backed up locally and on the cloud. This way, the information will always be available to you, even if the internet goes down. Below is how the site is structured.

### Structure

#### Main Website

[![Nuxt][Nuxt.js]][Nuxt-url]

* **Repo:** <https://github.com/somethingnew71/classicminidiy>
* **URL:** <https://classicminidiy.com>
* **Description:** The main website is a Nuxt.js site, and the majority of the technical tooling lives in this repo.
* The site is hosted on Vercel via Serverless deployment.

#### Archive

[![NuxtContent][NuxtContent]][NuxtContent-url]

* **Repo:** <https://github.com/somethingnew71/archive>
* **URL:** <https://classicminidiy.com/archive>
* **Description:** The primary routes and page structure are hosted within the main site, but the content is stored in a separate repo. This is to keep the main site repo clean and focused on the technical aspects of the site. The archive dynamically delivered via Nuxt Content, and the content is stored in a separate repo.

#### Infrastructure

All of these sites are hosted on Vercel, and the content is stored in an S3 bucket with intelligent tiering and versioning. All of our various tables are stored in DynamoDB for fast and easy access. This way, the site can be restored in the event of a catastrophic failure. These are all managed by AWS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

[![Nuxt][Nuxt.js]][Nuxt-url] [![NuxtContent][NuxtContent]][NuxtContent-url] [![Vue][Vue.js]][Vue-url] [![Vercel][Vercel]][Vercel-url] [![S3][S3]][S3-url] [![Dynamo][Dynamo]][Dynamo-url] [![FontAwesome][FontAwesome]][FontAwesome-url] [![Vuetify][Vuetify]][Vuetify-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork any of the Organization Repos
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/somethingnew71/classicminidiy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=classic-mini-diy/classicminidiy" />
</a>

## Credits

This software uses the following sources for information:

* [Seven Mini Parts](https://7ent.com) - Needle Chart and Parts
* [MintyLamb](http://www.mintylamb.co.uk/suneedle/) - Needle Configurator
* [Amazon.com](https://amazon.com) - Recommended Manuals
* [MiniColours.co.uk](http://mini-colours.co.uk/) - Color Picker
* miniweights.co.uk - Mini Weights (Offline)
* mk1-performance.com - Original Mini Archive (Offline)
* Multiple Mini Forums - Various Information

## Related

* [Classic Mini DIY YouTube](https://youtube.com/c/classicminidiy) - Check out the YouTube Channel that started it all
* [Classic Mini DIY Store](https://store.classicminidiy.com) - Support the channel by purchasing some merch

## Support

  <a href="https://www.patreon.com/classicminidiy" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="150">
  </a>

## License

Distributed under the GNU General Public License v2.0.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/classic-mini-diy/classicminidiy?style=for-the-badge
[contributors-url]: https://github.com/somethingnew71/classicminidiy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/classic-mini-diy/classicminidiy?style=for-the-badge
[forks-url]: https://github.com/somethingnew71/classicminidiy/network/members
[stars-shield]: https://img.shields.io/github/stars/classic-mini-diy/classicminidiy?style=for-the-badge
[stars-url]: https://github.com/somethingnew71/classicminidiy/stargazers
[issues-shield]: https://img.shields.io/github/issues/classic-mini-diy/classicminidiy?style=for-the-badge
[issues-url]: https://github.com/somethingnew71/classicminidiy/issues
[license-shield]: https://img.shields.io/github/license/classic-mini-diy/.github?style=for-the-badge
[license-url]: https://choosealicense.com/licenses/gpl-3.0/
[product-screenshot]: https://classicminidiy.s3.us-east-1.amazonaws.com/misc/product-preview.png

<!-- Badges for Icons -->
[Nuxt.js]: https://img.shields.io/badge/nuxt.js-020421?style=for-the-badge&logo=nuxt&logoColor=00dc82
[Nuxt-url]: https://nuxt.com/
[NuxtContent]: https://img.shields.io/badge/Nuxt/Content-020617?style=for-the-badge&logo=nuxt&logoColor=00dc82
[NuxtContent-url]: https://content.nuxt.com/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Vercel]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Dynamo]: https://img.shields.io/badge/DynamoDB-FF9900?style=for-the-badge&logo=amazondynamodb&logoColor=white
[Dynamo-url]: https://docs.aws.amazon.com/dynamodb/?icmpid=docs_homepage_databases
[S3]: https://img.shields.io/badge/AmazonS3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white
[S3-url]: https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs
[FontAwesome]: https://img.shields.io/badge/FontAwesome-538DD7?style=for-the-badge&logo=fontawesome&logoColor=white
[FontAwesome-url]: https://fontawesome.com/
[vuetify]: https://img.shields.io/badge/vuetify-1967c0?style=for-the-badge&logo=vuetify&logoColor=white
[vuetify-url]: https://vuetify.com/