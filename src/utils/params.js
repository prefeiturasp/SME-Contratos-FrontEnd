export const getUrlParams = () => {
  let vars = {};
  window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    },
  );
  return vars;
};
