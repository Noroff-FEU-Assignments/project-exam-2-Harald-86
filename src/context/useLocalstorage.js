// not implemented yet.. delete if not used

export default function getLocalstorageInfo(key, defaultValue) {
  //getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial;
}
