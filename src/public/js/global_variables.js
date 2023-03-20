function getHeader() {
  global.cfClient
    .getEntries({
      include: '3',
      content_type: "header"
    })
    .then(entries => {
      const header = entries.items[0].fields;
      global.appServer.locals.headerData = header;
    });
}

function getFooter() {
  global.cfClient
    .getEntries({
      content_type: "footer"
    })
    .then(entries => {
      const footer = entries.items[0].fields;
      global.appServer.locals.footerData = footer;
    });
}

exports.getGlobalEntriesData = function() {
  getHeader();
  getFooter();
};
