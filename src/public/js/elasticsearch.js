// const elasticsearch = require('elasticsearch');
// const log = require('./logger');
// const contentful = require('contentful');
// const mapContentfulToElasticsearch = require('./map-contentful-to-elasticsearch.js');
// var rp = require('request-promise');

// var client = new elasticsearch.Client({
//   host: process.env.BONSAI_URL || 'localhost:9200'
// });

// // client.ping({
// //   requestTimeout:30000,
// // }, (error)=>{
// //     if(error){
// //       console.error("Elastic cluster is down");
// //     } else {
// //       console.log("All is well");
// //     }
// //   }
// // });

// function getsearchresult(req, res, next) {
// var q = req.query.q;
// let pagesize=10;
// var page = " ";
// if(req.query.pageno == "" || req.query.pageno == undefined)
// {
//     page = 1;
// }
// else
// {
//     page = req.query.pageno;
// }
// var options = {
//   uri: process.env.BONSAI_URL + '/' + process.env.ES_INDEX + '/_search',
//   qs: {
//       q: q,
//       from : (page - 1) * pagesize,
//       size : pagesize,
//   },
//   headers: {
//       'User-Agent': 'Request-Promise'
//   },
//   json: true
// };
// rp(options)
//   .then(function (results) {
//     let pages = results.hits.total/pagesize;
//     var noofpages = [];
//     if(pages > 1)
//     {
//       pages = Math.ceil(pages);
//     }else if(pages > 0)
//     {
//       pages = 1;
//     }else{
//       pages = 0;
//     }
//     console.log("Page after result", pages);
//     for(let k=0;k<pages;k++)
//     {
//       let psize = k+1;
//       noofpages.push({pagesize:psize,searchquery:q});
//     }
//     if(results.hits.total > 0)
//     {
//     res.render('search', {
//       body: results.hits.hits,
//       total: results.hits.total,
//       isrecord:true,
//       pagedata:noofpages
//     });
//   }else {
//     res.render('search', {
//       body: 'No Results Found',
//       total: results.hits.total,
//       isrecord:false,
//     });
//   }
//   })
//   .catch(function (err) {
//       console.log("Error-",err);
//   });
// }

// const mapping = elasticsearch.getMapper();
// //function createMapping() {
//   const buildmapping =
//     mapping
//       .add('basicpage', [
//         mapping
//           .field('pageTitle')
//           .shortText(),
//         mapping
//           .field('pageUrl')
//           .shortText(),
//         mapping
//           .field('metaTitle')
//           .shortText(),
//         mapping
//           .field('metaDescription')
//           .longText(),
//         mapping
//           .field('bannerText')
//           .longText(),
//         mapping
//           .field('contentSection1')
//           .longText(),
//         mapping
//           .field('contentSection2')
//           .longText(),
//         mapping
//           .field('contentSection3')
//           .longText(),
//         mapping
//           .field('contentSection4')
//           .longText(),
//         mapping
//           .field('contentSection5')
//           .longText(),
//         mapping
//           .field('contentSection6')
//           .longText(),
//         mapping
//           .field('references')
//           .longText()
//       ]);
// //}

// const getEntries = async (type) => {
//     log('debug', 'elasticsearch.js@getEntries()', `Attempting to get all entries of type ${type}`);
//       const { items } = await cfClient.getEntries({
//         content_type: type, include: 10, limit: 500
//       });
//     //console.log('getEntries', items);
//     return items.filter((item) => { return 'fields' in item; });
// };

// const getEntriesById = async (id) => {
//   log('debug', 'elasticsearch.js@getEntriesById()', `Attempting to get single entry of type ${id}`);
//   try {
//      const { items } = await cfClient.getEntries({
//     // const { items } = await global.cfClient.getEntries
//        'sys.id': id
//      });
//     //console.log('getEntriesById', items);
//     return items.filter((item) => { return 'fields' in item; });
//   } catch (e) {
//     console.log('get entry error', e);
//   }
//   return '';
// };

// // initializing search........
// const initsearch = async (req, res, next) => {
//   log(
//     'info',
//     'elasticsearch.js@initindex()',
//     'Starting Elasticsearch initial index fetching entries',
//   );
//   const basicpage = (await getEntries('basicPage')).reduce((a, b) => { return a.concat(b); }, []);
  
//   log('info', 'elasticsearch.js@initindex()', 'Connecting to elasticsearch');
//   try {
//     //const mapping = elasticsearch.getMapper();
//     log(
//       'info',
//       'elasticsearch.js@initindex()',
//       'Building Elasticsearch Mapping',
//     );
//     try {
//       await buildmapping.build();
//     } catch (e) {
//       console.log('error on build map', e);
//       res.status(503).send("Internal server error");
//     }

//     // Map our contentful entries to correcct elasticsearch format
//     const formattedEntries = [];
//     //rebatePage, SafeForEveryStagePage, FaqPage
//     [basicpage]
//       .forEach((contentType) => {
//         //console.log("contentType------------------->",contentType);
//         const type = 'basicPage';
//         log(
//           'info',
//           'elasticsearch.js@initindex()',
//           'Inserting entries into elasticsearch',
//         );
//         formattedEntries.push(
//           mapContentfulToElasticsearch(
//             contentType,
//             type,
//           ),
//         );
//       });
//     await elasticsearch.bulkCreate(
//       formattedEntries.reduce((a, b) => {  return a.concat(b); }, []),
//     );
//     log(
//       'info',
//       'elasticsearch.js@initindex()',
//       'Finished elasticsearch reindex',
//     );
//     res.status(200).send("Index Created");
//   } catch (err) {
//     console.log(err);
//     res.status(503).send("Internal server error");
//     log(
//       'warn',
//       'elasticsearch.js@initindex()',
//       'Unable to connect to elasticsearch',
//     );
//   }
// }


// module.exports = { initsearch, getsearchresult }