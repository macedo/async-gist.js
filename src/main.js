require(["jquery"], function ($) {
  var AsyncGist = (function(document, window, undefined) {
    var AsyncGist = {
      baseUrl: "https://gist.github.com/"
    };

    function getGistId() {
      var elements = document.getElementsByTagName("code")
        , id;

      for (var i = 0; i < elements.length; i++) {
        id = elements[i].getAttribute("data-gist-id");

        if (id) {
          return id;
        }
      }

      return null;
    }

    function requestGistData(gistId, callback) {
      $.ajax({
        url: AsyncGist.baseUrl + gistId + ".json",
        dataType: "jsonp",
        success: function(data) {
          callback(data);
        }
      });
    }

    function isCssReady(callback) {
      var testElement = document.createElement("span");
      testElement.id = "css-ready";
      testElement.className = "gist";
      testElement.style = "color: #fff";

      var entry = document.getElementsByTagName("script")[0];
      entry.parentNode.insertBefore(testElement, entry);

      (function poll() {
        var node = document.getElementById("css-ready")
          , value;

        if (window.getComputedStyle) {
          value = document.defaultView
                          .getComputedStyle(testElement, null)
                          .getPropertyValue("color");
        } else if (node.currentStyle) {
          value = node.currentStyle.color;
        }

        if (value && value === "rgb(0, 0, 0)" || value.toLowerCase() === "#000") {
          callback();
        } else {
          setTimeout(poll, 500);
        }
      })();
    }

    function init() {
      var gistId = getGistId();

      if (gistId) {
        requestGistData(gistId, function(response) {
          $dataGist = $("[data-gist-id='" + gistId + "']");

          if (response && response.div) {
            if (response.stylesheet) {
              var element = document.createElement("link")
                , head = document.getElementsByTagName("head")[0];

              element.type = "text/css"
              element.rel = "stylesheet"
              element.href = response.stylesheet;

              head.appendChild(element);
            }

            isCssReady(function() {
                console.log("aqui");
                $dataGist.html("")
                         .append(response.div);
            });
          }
        });
      }
    }

    init();
  })(document, window);
});
