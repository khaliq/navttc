function fetchLocalFile() {
  axios
    .get("sampsle.txt")
    .then((res) => {
      document.getElementById("result").innerText = res.data;
    })
    .catch((er) => {
      document.getElementById("result").innerText = er.message;

      console.log(er.message);
    });
}

// Fetch and display Namaz (prayer) times for Islamabad, Pakistan using Aladhan API
function fetchNamazTimes() {
  var url =
    "https://api.aladhan.com/v1/timingsByCity?city=Islamabad&country=Pakistan&method=2";

  axios
    .get(url)
    .then((res) => {
      console.log(res);

      var t = res.data.data.timings;
      var html =
        "<strong>Namaz Times for Islamabad, Pakistan</strong><ul>" +
        "<li>Fajr: " +
        t.Fajr +
        "</li>" +
        "<li>Dhuhr: " +
        t.Dhuhr +
        "</li>" +
        "<li>Asr: " +
        t.Asr +
        "</li>" +
        "<li>Maghrib: " +
        t.Maghrib +
        "</li>" +
        "<li>Isha: " +
        t.Isha +
        "</li>" +
        "<li>Sunrise: " +
        t.Sunrise +
        "</li>" +
        "<li>Sunset: " +
        t.Sunset +
        "</li>" +
        "</ul>";
      document.getElementById("result").innerHTML = html;
    })
    .catch((er) => {
      document.getElementById("result").innerHTML =
        "Could not fetch Namaz times.";
    });
}

// Fetch and display a list of posts from JSONPlaceholder
function fetchPosts() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then((res) => {
      console.log(res);

      var html = "<strong>Posts List:</strong><ul>";
      res.data.forEach(function (post) {
        html +=
          "<li><strong>" + post.title + "</strong><br>" + post.body + "</li>";
      });
      html += "</ul>";
      document.getElementById("result").innerHTML = html;
    })
    .catch((er) => {
      document.getElementById("result").innerHTML = er.message;
    });
}

// Fetch and display a random post from JSONPlaceholder
function fetchPost() {
  var xhr = new XMLHttpRequest();
  // Get a random post between 1 and 100
  var postId = Math.floor(Math.random() * 100) + 1;
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/" + postId, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var post = JSON.parse(xhr.responseText);
      var html =
        "<strong>Post Title:</strong> " +
        post.title +
        "<br>" +
        "<strong>Body:</strong> <br>" +
        post.body;
      document.getElementById("result").innerHTML = html;
    }
  };
  xhr.send();
}
function fetchUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://randomuser.me/api/", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var user = data.results[0];
      var html =
        "<strong>Name:</strong> " +
        user.name.first +
        " " +
        user.name.last +
        "<br>" +
        "<strong>Email:</strong> " +
        user.email +
        "<br>" +
        '<img src="' +
        user.picture.medium +
        '" alt="User Picture">';
      document.getElementById("result").innerHTML = html;
    }
  };
  xhr.send();
}
