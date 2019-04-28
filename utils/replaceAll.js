export default function replaceAll(string, pattern, replacement) {
  let regX = new RegExp(pattern, "g");
  return string.replace(regX, replacement);
};
