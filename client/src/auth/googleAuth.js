export const onGoogleScriptLoad = (setAuth) => {
    return async() => {
      const _gapi = window.gapi;

      _gapi.load("auth2", async () => {
        const GoogleAuth = await _gapi.auth2.init({
          client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        });

        setAuth(GoogleAuth);
      });
    }
};

export const loadGoogleScript = () => {
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
