$(document).ready(function () {
  $('.menu').click(function () {
    $('ul').toggleClass('active');
    $('ul.tabs').tabs();
  })
})


function sourceOpen(x) {
  if (x.matches) { // If media query matches
    $('sources').addClass('sourcehidden');
  }
}

var x = window.matchMedia("(max-width: 700px)");
sourceOpen(x); // Call listener function at run time
x.addListener(sourceOpen); // Attach listener function on state changes

function openIframe(url) {
  window.open(url, url, "width=800, height=700, directories = no");
}
window.sortBy = 'publishedAt';

$.fn.disableScroll = function () {
  window.oldScrollPos = $(window).scrollTop();

  $(window).on('scroll.scrolldisabler', function (event) {
    $(window).scrollTop(window.oldScrollPos);
    event.preventDefault();
  });
};

$.fn.enableScroll = function () {
  $(window).off('scroll.scrolldisabler');
};

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
var yesterday = formatDate(new Date(Date.now() - 864e5));
cat = "technology";
//$(window).on('load', function (e) {$('.tabs').tabs('select_tab', cat);});
activeTab = "#" + cat;
$(activeTab).addClass('active');

q = "";
if (q) {
  q = "&q=" + q;
}
cat = "category=" + cat + "&";
var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278";

var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";

function fetchNews(url, num) {
  try {
    $.get({
      url: url,
      cache: false
    }).then(function (rdata) {
      if (num === "headlines" && rdata.totalResults < 1) {
        $('#headlinetitle').hide();
      } else if (num === "headlines" && rdata.totalResults > 1) {
        $('#headlinetitle').show();
      }
      console.log(rdata);
      console.log(num);
      var articles = rdata.articles;
      for (i in articles) {
        title = articles[i].title;
        url = articles[i].url;
        img = "https://pjtsearch.com/Javascript/proxy.php?url=" + articles[i].urlToImage;
        desc = articles[i].description;
        try {
          if (title.indexOf('adult') === -1 && title.indexOf('hell ') === -1 && desc.indexOf('adult') === -1 && desc.indexOf('hell ') === -1 && desc.indexOf('hell,') === -1) {
            articletag = "#article" + num + i;
            $(num).append('<div class="article" id="' + "article" + num + i + `" onclick="openIframe('` + url + `');"></div>`);
            $(articletag).append('<h5 class = "title"  id="title' + i + '">' + title + '</h5>');
            $(articletag).append('<img class="img" src="' + img + '">');
            if (desc !== null) {
              $(articletag).append('<p class="desc" > ' + desc + '</p>');
            }
          }
        } catch (err) {}
      }
    });
  } catch (err) {}
}
fetchNews(url1, 'headlines');
fetchNews(url2, 'news');

function changeCat(category) {
  $('headlines').empty();
  $('news').empty();
  $('#searchnews').val('');
  cat = category;
  q = "";
  if (q) {
    q = "&q=" + q;
  }
  //$('.tabs').tabs('select_tab', cat);
  //$(activeTab).addClass('active');
  cat = "category=" + cat + "&";
  var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278";
  var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
  fetchNews(url1, 'headlines');
  fetchNews(url2, 'news');

  setTimeout(function () {
    function imgLoaded(imgElement) {
      return imgElement.complete && imgElement.naturalHeight !== 0;
    }

    for (i in document.querySelectorAll('img')) {
      if (imgLoaded(document.querySelectorAll('img')[i]) === false) {
        document.querySelectorAll('img')[i].style.width = '0';
      }
    }
  }, 1000);
  getSources();
}

function changeQ(question) {
  $('headlines').empty();
  $('news').empty();
  //cat= cat;
  q = question;
  if (q) {
    q = "&q=" + q;
  }
  if (window.source !== undefined) {
    //cat= "category=" + cat + "&";
    var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278" + window.source;
    var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278" + window.source;
  } else {
    var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278";
    console.log(url1);
    var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
  }
  fetchNews(url1, 'headlines');
  fetchNews(url2, 'news');

  setTimeout(function () {
    function imgLoaded(imgElement) {
      return imgElement.complete && imgElement.naturalHeight !== 0;
    }

    for (i in document.querySelectorAll('img')) {
      if (imgLoaded(document.querySelectorAll('img')[i]) === false) {
        document.querySelectorAll('img')[i].style.width = '0';
      }
    }
  }, 1000);

}


function changeSource(source) {
  $('headlines').empty();
  $('news').empty();
  q = window.q;
  if (source !== '') {
    source = "&sources=" + source;

  }
  window.source = source;
  //console.log(cat);
  var url1 = "https://newsapi.org/v2/top-headlines?from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + source + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
  if (source === '') {
    var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + '&' + cat + "sortBy=" + window.sortBy + "&pageSize=35" + source + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
    console.log(url1);
  }
  var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + source + q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
  fetchNews(url1, 'headlines');
  fetchNews(url2, 'news');

  setTimeout(function () {
    function imgLoaded(imgElement) {
      return imgElement.complete && imgElement.naturalHeight !== 0;
    }
    for (i in document.querySelectorAll('img')) {
      if (imgLoaded(document.querySelectorAll('img')[i]) === false) {
        document.querySelectorAll('img')[i].style.width = '0';
      }
    }
  }, 1000);

}

function changeSort(sort) {
  $('headlines').empty();
  $('news').empty();
  window.sortBy = sort;
  //cat= cat;
  if (window.source !== undefined) {
    //cat= "category=" + cat + "&";
    var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + window.q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278" + window.source;
    var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + window.q + "&apiKey=f1d67c35bc654bebadf0cb0050680278" + window.source;
  } else {
    var url1 = "https://newsapi.org/v2/top-headlines?country=us&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + window.q + "&" + cat + "apiKey=f1d67c35bc654bebadf0cb0050680278";
    console.log(url1);
    var url2 = "https://newsapi.org/v2/everything?language=en&from=" + yesterday + "&sortBy=" + window.sortBy + "&pageSize=35" + window.q + "&apiKey=f1d67c35bc654bebadf0cb0050680278";
  }
  fetchNews(url1, 'headlines');
  fetchNews(url2, 'news');

  setTimeout(function () {
    function imgLoaded(imgElement) {
      return imgElement.complete && imgElement.naturalHeight !== 0;
    }

    for (i in document.querySelectorAll('img')) {
      if (imgLoaded(document.querySelectorAll('img')[i]) === false) {
        document.querySelectorAll('img')[i].style.width = '0';
      }
    }
  }, 1000);
}

function getSources() {
  $('sources').empty();
  $('sources').append("<div class='source' onclick=changeSource('')>All</div>");
  var cate = cat.slice(0, -1);
  var cate = cate.replace('category=', '');
  urlx = "https://newsapi.org/v2/sources?language=en&apiKey=f1d67c35bc654bebadf0cb0050680278&category=" + cate;
  $.get({
    url: urlx,
    cache: false
  }).then(function (rdata) {
    //console.log(rdata);
    for (i in rdata.sources) {
      el = "<div class='source' onclick='changeSource(`" + rdata.sources[i].id + "`)'>" + rdata.sources[i].name + "</div>";
      // console.log(el);
      $('sources').append(el);
    }
  });

  return cate;
}
getSources();


document.getElementById('searchnews').onkeydown = function (ele) {
  if (ele.code == "Enter") {
    if (this.value == "") {
      window.q = this.value;
      changeQ(this.value);
    } else {
      window.q = this.value;
      changeQ(this.value);
    }

  } else if (ele.keyCode == 13) {
    if (this.value == "") {
      window.q = this.value;
      changeQ(this.value);
    } else {
      window.q = this.value;
      changeQ(this.value);
    }
  }
}
setInterval(function () {
  if ($('#searchnews').val() !== '') {
    $('#closebutton > i').show();
  } else {
    $('#closebutton > i').hide();
  }
}, 500);
$('.source').click(function () {
  $('.source').css('color', 'whiet');
  this.style.color = '#4285f4';
});
$(document).on('click', ".source", function () {
  $('.source').css('color', 'whiet');
  this.style.color = '#4285f4';
});
$('.tab >a').click(function () {
  //console.log($(this).attr("id"));
  changeCat($(this).attr("id"));

});










mapboxgl.accessToken = 'pk.eyJ1IjoibWV6YXIiLCJhIjoiY2pnZzh5amMyNDVidjJ3bGlveGEyeDZxaSJ9.eV1srEZNonNXeljsG18mww';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mezar/cjh3vpgf714v02snvw88tentn', // stylesheet location
  center: [12.694512099999997, 56.0464674], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

