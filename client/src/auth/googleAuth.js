var googleOAuth

if (process.env.NODE_ENV == "development") {
  const onGoogleScriptLoad = (setAuth) => {
    return async () => {
      const _gapi = window.gapi;

      _gapi.load("auth2", async () => {
        const GoogleAuth = await _gapi.auth2.init({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        });

        setAuth(GoogleAuth);
      });
    };
  };

  const loadGoogleScript = () => {
    const id = "google-js";
    const src = "https://apis.google.com/js/platform.js";

    const firstJs = document.getElementsByTagName("script")[0];
    if (document.getElementById(id)) {
      return;
    }

    const js = document.createElement("script");
    js.id = id;
    js.src = src;
    js.onload = window.onGoogleScriptLoad;
    firstJs.parentNode.insertBefore(js, firstJs);
  };

  googleOAuth = {
    onGoogleScriptLoad,
    loadGoogleScript,
  };
}

if (process.env.NODE_ENV === "production") {
  let manifest = window.chrome.runtime.getManifest();
  let clientId = encodeURIComponent(process.env.REACT_APP_OAUTH_CLIENT_ID);
  let scopes = encodeURIComponent(manifest.oauth2.scopes.join(" "));
  var redirectUri = encodeURIComponent(
    "https://" + window.location.hostname + ".chromiumapp.org"
  );

  var url =
    "https://accounts.google.com/o/oauth2/auth" +
    "?client_id=" +
    clientId +
    "&response_type=id_token" +
    "&access_type=offline" +
    "&redirect_uri=" +
    redirectUri +
    "&scope=" +
    scopes;

  const launchGoogleAuthFlow = (setToken) => {
    window.chrome.identity.launchWebAuthFlow(
      {
        url: url,
        interactive: true,
      },
      function (response) {
        if (window.chrome.runtime.lastError) {
          console.log(window.chrome.runtime.lastError.message);
        } else {
          // Example: id_token=<YOUR_BELOVED_ID_TOKEN>&authuser=0&hd=<SOME.DOMAIN.PL>&session_state=<SESSION_SATE>&prompt=<PROMPT>
          var res = response.split("#", 2)[1];
          var raw_token = res.split("&")[0];

          var token = raw_token.slice(9);
          setToken(token);
        }
      }
    );
  };

  googleOAuth = {
    launchGoogleAuthFlow,
  };
}

export {googleOAuth}