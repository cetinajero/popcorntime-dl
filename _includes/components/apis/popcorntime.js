<script>

  function makeHttpObject() {
    try { return new XMLHttpRequest();                    } catch (error) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP");     } catch (error) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP");  } catch (error) {}
    throw new Error("Could not create HTTP request object.");
  }

  function requestPopcornTimeApi(query) {
    var request = makeHttpObject();
    request.open("GET", `{{ site.api.popcorntime.host }}{{ site.api.popcorntime.uri.movies }}`, true);
    request.send(null);
    return request;
  }

  function parsePopcornTimeResponse(json) {
    var response = JSON.parse(json.responseText);
    if (response.length) {
      for (item = 0; item < response.length; item++) {
        appendItem(response[item]);
      }
    } else {
      document.querySelector('#show-results').innerHTML = `
        <p class="lead text-center pt-5">No movies to show</p>
      `;
    }
  }

  function appendItem(item) {
    const showResults = document.querySelector('#show-results');
    const itemGenres = item.genres.join(' / ');
    const timeZoneOffSet = new Date().getTimezoneOffset();
    const releasedDate = new Date((item.released+timeZoneOffSet*60)*1000).toDateString();
    const ratingScore = item.rating.percentage/10

    var newcontent = document.createElement('div');
    newcontent.innerHTML = `
      {% include components/jumbotron/bootstrap.html %}
    `;

    while (newcontent.firstChild) {
      showResults.appendChild(newcontent.firstChild);
    }
  }

  function startApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    var response = requestPopcornTimeApi(query);
    response.onreadystatechange = function() {
      if (response.readyState == 4)
        parsePopcornTimeResponse(response);
    };
  }

  startApp();

</script>
