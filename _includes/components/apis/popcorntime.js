const queryTypes = {{ site.api.popcorntime.types }};

  function makeHttpObject() {
    try { return new XMLHttpRequest();                    } catch (error) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP");     } catch (error) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP");  } catch (error) {}
    throw new Error("Could not create HTTP request object.");
  }

  function requestPopcornTimeApi(query, type) {
    // Append uri only when asked for many results
    const uri = type.substring(type.length - 1, type.length) == 's' ? '1?keywords=' : '';

    var request = makeHttpObject();
    request.open("GET", `{{ site.api.popcorntime.host }}/${type}/${uri}${query}`, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4)
        parsePopcornTimeResponse(request);
    };
    return null;
  }

  function parsePopcornTimeResponse(json) {
    var response = JSON.parse(json.responseText);
    if (response.length) { // many results
      for (item = 0; item < response.length; item++) {
        appendItem(response[item]);
      }
    } else if (response.imdb_id) { // only one results
        appendItem(response);
    } else if (json.responseURL.includes(`/${queryTypes[queryTypes.length - 1]}/`)) {
      notifyNoResults(); // no results in the last query to the API
    }
  }

  function appendItem(item) {
    const showResults = document.querySelector('#show-results');
    const itemGenres = item.genres ? item.genres.join(' / ') : '';
    const timeZoneOffSet = new Date().getTimezoneOffset();
    const releasedDate = new Date((item.released+timeZoneOffSet*60)*1000).toDateString();
    const updatedDate = new Date((item.last_updated/1000+timeZoneOffSet*60)*1000).toDateString();
    const ratingScore = item.rating.percentage/10

    var newcontent = document.createElement('div');

    {% include components/jumbotron/bootstrap.js %}
    newcontent.innerHTML = item.genres ? `
      {% include components/jumbotron/bootstrap.html %}
    ` : requestPopcornTimeApi(item.imdb_id, 'show');

    while (newcontent.firstChild) {
      showResults.appendChild(newcontent.firstChild);
    }
  }

  function notifyNoResults() {
    if (!document.querySelector('#show-results').childNodes.length) {
      document.querySelector('#show-results').innerHTML = `
        <p class="lead text-center pt-5">No results found</p>
      `;
    }
  }

  function startApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    document.querySelector('#searchInput').value = query;
    for (i = 0; i < queryTypes.length; i++) {
      requestPopcornTimeApi(query, queryTypes[i]);
    }
  }

  startApp();
