export const sortDate = (a, b) => {
  var aa = a.split("/").reverse().join(),
    bb = b.split("/").reverse().join();
  return aa < bb ? -1 : aa > bb ? 1 : 0;
};
