(function () {
  'use strict';

  var label = document.getElementById('about-last-updated');
  if (!label) return;

  var repository = label.dataset.repository;
  var endpoint = 'https://api.github.com/repos/' + repository +
    '/commits?path=' + encodeURIComponent('_pages/about.md') + '&per_page=1';

  fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (response) {
      if (!response.ok) throw new Error('Commit history unavailable');
      return response.json();
    })
    .then(function (commits) {
      var timestamp = commits[0] && commits[0].commit &&
        commits[0].commit.committer && commits[0].commit.committer.date;
      var date = new Date(timestamp);
      if (!timestamp || isNaN(date.getTime())) return;
      var parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(date);
      var values = {};
      parts.forEach(function (part) { values[part.type] = part.value; });
      var formatted = values.year + '-' + values.month + '-' + values.day;
      label.textContent = formatted;
      label.dateTime = formatted;
    })
    .catch(function () {
      // Preserve the known about.md date on network errors or API rate limits.
    });
}());
