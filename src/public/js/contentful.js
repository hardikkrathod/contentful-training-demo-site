const contentful = require("contentful");
const url = require("url");

function getIndexPage() {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        content_type: "indexPage",
        // "fields.pageUrl": url.parse(req.originalUrl).pathname,
        include: "3"
      })
      .then(entries => {
        // console.log(entries.items[0].fields);
        fulfill(entries.items[0].fields);
      })
      .catch(error => {
        console.log("Error in getGetIndexPage");
        reject(error);
      });
  });
}

function getProductDetails(req, res) {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        content_type: "product",
        "fields.productUrl": url.parse(req.originalUrl).pathname,
        include: "3"
      })
      .then(entries => {
        // console.log(entries.items[0].fields);
        fulfill(entries.items[0].fields);
      })
      .catch(error => {
        console.log("Error in getProductDetails");
        reject(error);
      });
  });
}

function getAllProducts() {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        // limit: 1000,
        // skip: 0,
        order: 'fields.name',
        content_type: "product",
        include: "3"
      })
      .then(entries => {
        // console.log(entries.items);
        fulfill(entries.items);
      })
      .catch(error => {
        console.log("Error in getAllProducts");
        reject(error);
      });
  });
}

function getFilteredProducts(filterValue) {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        // limit: 3,
        // skip: 0,
        order: 'fields.name',
        content_type: "product",
        'fields.type.sys.contentType.sys.id': 'productType',
        'fields.type.fields.typeName': filterValue,
        include: "3"
      })
      .then(entries => {
        fulfill(entries.items);
      })
      .catch(error => {
        console.log("Error in getAllProducts");
        reject(error);
      });
  });
}

function getProductType() {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        order: 'fields.typeName',
        content_type: "productType",
        include: "3"
      })
      .then(entries => {
        fulfill(entries.items);
      })
      .catch(error => {
        console.log("Error in getProductsType");
        reject(error);
      });
  });
}

function getAboutPage() {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        content_type: "aboutUs",
        // "fields.pageUrl": url.parse(req.originalUrl).pathname,
        include: "3"
      })
      .then(entries => {
        // console.log(entries.items[0].fields);
        fulfill(entries.items[0].fields);
      })
      .catch(error => {
        console.log("Error in getGetAboutPage");
        reject(error);
      });
  });
}

function getContactPage() {
  return new Promise((fulfill, reject) => {
    global.cfClient
      .getEntries({
        content_type: "contactUs",
        // "fields.pageUrl": url.parse(req.originalUrl).pathname,
        include: "3"
      })
      .then(entries => {
        // console.log(entries.items[0].fields);
        fulfill(entries.items[0].fields);
      })
      .catch(error => {
        console.log("Error in getGetContactPage");
        reject(error);
      });
  });
}

module.exports = {
  getIndexPage,
  getProductDetails,
  getAllProducts,
  getFilteredProducts,
  getProductType,
  getAboutPage,
  getContactPage
};
