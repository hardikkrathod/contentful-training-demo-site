const express = require("express");
const contentful = require("./contentful");
const router = express.Router();
const sanitizer = require("sanitizer");
// const ContentfulTextSearch = require('contentful-text-search');
// const elasticsearch =  require("./elasticsearch.js");

// const search = new ContentfulTextSearch({
//   space: process.env.CONTENTFUL_SPACEID,
//   token: process.env.CONTENTFUL_ACCESSTOKEN,
//   elasticHost: process.env.BONSAI_URL || 'localhost:9200',
//   contentfulHost: process.env.CONTENTFUL_HOST,
//   // redisHost: 'optionalString',
//   // elasticUser: 'optionalString',
//   // elasticPassword: 'optionalString',
//   // elasticLogLevel: 'optionalString'
// });

router.get("/", function (req, res) {
  contentful
    .getIndexPage()
    .then((index) => {
      indexData = index;
      res.render("index", { indexData });
    })
    .catch((error) => {
      console.log("There was an error retrieving Index Page Content.", error);
      res.redirect("error");
      next();
    });
});

router.get("/product", function (req, res) {
  contentful.getProductType().then((producttype) => {
    allTypes = producttype;
    var filterValue = sanitizer.escape(req.query.filter);
    if (filterValue) {
      contentful
        .getFilteredProducts(filterValue)
        .then((products) => {
          allProducts = products;
          res.render("product", { allProducts, allTypes });
        })
        .catch((error) => {
          console.log("There was an error retrieving Filtered Products.", error);
          res.redirect("error");
          next();
        });
    } else {
      contentful
        .getAllProducts()
        .then((products) => {
          allProducts = products;
          res.render("product", { allProducts, allTypes });
        })
        .catch((error) => {
          console.log("There was an error retrieving All Product Detail.", error);
          res.redirect("error");
          next();
        });
    }
  }).catch((error) => {
    console.log("There was an error retrieving All Product Type.", error);
          res.redirect("error");
          next();
  });
});

router.get("/product-details/:product", function (req, res) {
  contentful
    .getProductDetails(req, res)
    .then((productdtls) => {
      productDetailsData = productdtls;
      res.render("product-details", { productDetailsData });
    })
    .catch((error) => {
      console.log("There was an error retrieving Product Details.", error);
      res.redirect("error");
      next();
    });
});

router.get("/about-us", function (req, res) {
  contentful
    .getAboutPage()
    .then((about) => {
      aboutData = about;
      res.render("about", { aboutData });
    })
    .catch((error) => {
      console.log("There was an error retieving About Us page data", error);
      res.redirect("error");
      next();
    });
});

router.get("/contact-us", function (req, res) {
  contentful
    .getContactPage()
    .then((contact) => {
      contactData = contact;
      res.render("contact", { contactData });
    })
    .catch((error) => {
      console.log("There was an error retieving Contact Us page data", error);
      res.redirect("error");
      next();
    });
});

// router.get("/search", function (req, res, next) {
//   // if(req.query.q == "" || req.query.q == undefined){
//   //   res.render('search');
//   // } else {
//     var answer = JSON.parse(search.query(req.query.q, 'en-US'));
//     console.log(answer);
//     // elasticsearch.getsearchresult(req, res, next);
//   // }
// });

// router.get("/initindex", function (req, res, next) {
//   search.indexer.fullReindex(req, res, next);
// });

router.get("/error", function (req, res) {
  res.render("error");
  res.status(404);
});

module.exports = router;
