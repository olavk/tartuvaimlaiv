export function toMap(array) {
  const map = {};
  array.forEach(item => {
    map[item] = true;
  });
  return map;
}

export function toArray(map) {
  Object.keys(map).map(key => map[key]).filter(item => item);
}
