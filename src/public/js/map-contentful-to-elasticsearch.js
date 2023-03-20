// const logger = require('./logger.js').logger;

// const mapContentfulToElasticsearch = (entriesArray, contentType) => {
//   switch (contentType) {
    
//     case 'basicPage':
//       try {
//         const mappedSections = entriesArray.map(section => ({
//           id: section.sys.id,
//           type: 'basicpage',
//           body: {
//             pageTitle: section.fields.pageTitle,
//             pageUrl: section.fields.pageUrl,
//             metaTitle: section.fields.metaTitle,
//             metaDescription: section.fields.metaDescription,
//             bannerText: section.fields.bannerText,
//             contentSection1: section.fields.contentSection1,
//             contentSection2: section.fields.contentSection2,
//             contentSection3: section.fields.contentSection3,
//             contentSection4: section.fields.contentSection4,
//             contentSection5: section.fields.contentSection5,
//             contentSection6: section.fields.contentSection6,
//             references: section.fields.references
//           },
//         }));
//         return mappedSections;
//       } catch (err) {
//         logger(
//           'error',
//           'map-contentful-to-elasticsearch.js',
//           `Error in Product:  ${err}`
//         );
//         return {};
//       }
//     default:
//       return {};
//   }
// };


// module.exports = mapContentfulToElasticsearch;