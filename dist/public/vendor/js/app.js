  var stickyPath = window.location.pathname;
  var slash = "/";
  $('.site-menu li').each(function () {
    if ($(this).find('a').attr('href') === slash.concat((stickyPath.split("/")[1]))) {
      $(this).addClass('active');
    }
    if (($(this).find('a').attr('href') =="/product") && slash.concat((stickyPath.split("/")[1])) == "/product-details") {
      $(this).addClass('active');
    }
  });