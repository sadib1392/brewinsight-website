/* BrewInsight pre-launch gate.
 *
 * Sends everyone to splash.html unless this browser has been unlocked once
 * with the access link. Loaded synchronously as the FIRST thing in <head> so
 * the real page never renders for a locked visitor.
 *
 * Unlock a device:  https://brewinsight.io/?access=<TOKEN>
 * Re-lock a device: https://brewinsight.io/?access=out
 *
 * TO LAUNCH THE SITE: delete the <script src="gate.js"> line from the five
 * page files (index, product, methodology, resources, contact) and drop the
 * "noindex" meta tag from each. Nothing else depends on this file.
 *
 * NOTE: this is a curtain, not a vault. It hides the site from ordinary
 * visitors, but the page source is still served by GitHub Pages, so anyone
 * determined can read it. See README for the hardened options.
 */
(function () {
  var KEY = "bi_access";
  var TOKEN = "4627749aeeb1559a1c814434";

  var unlocked = false;

  try {
    var param = null;
    var q = window.location.search;
    if (q.indexOf("access=") !== -1) {
      param = decodeURIComponent(q.split("access=")[1].split("&")[0]);
    }

    if (param !== null) {
      if (param === TOKEN) {
        window.localStorage.setItem(KEY, TOKEN);
      } else {
        window.localStorage.removeItem(KEY);
      }
      // strip the token from the address bar so it is not left on screen
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.hash);
      }
    }

    unlocked = window.localStorage.getItem(KEY) === TOKEN;
  } catch (e) {
    // private mode / storage blocked: stay locked, which is the safe default
    unlocked = false;
  }

  if (!unlocked) {
    window.location.replace("splash.html");
  }
})();
