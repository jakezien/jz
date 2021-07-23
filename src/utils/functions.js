import { GatsbyImage, getImage } from "gatsby-plugin-image";

export function testFunc(arg) {
  return arg
}

// filter a collection of file nodes and return one with matching name
export function imageByName(props, name) {
  return getImage(props.images.filter(node => node.name.includes(name))[0])
}

export function getImageWithFilename(images, filename) {
  return getImage(images.filter(node => node.name.includes(filename))[0])
}

export function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
  );
}

export function numberLabel(label, list) {
  let length
  if (typeof list === 'number') length = list;
  else length = list.length

  if (!length || length === 0 ) {
    return 'No ' + label + 's'
  }
  if (length === 1 ) {
    return '1 ' + label
  }
  return length + ' ' + label + 's'
}
  
export function chunkArray(array, chunkSize) {
  let results = [];
  let clone = array.slice()
  while (clone.length) {
    results.push(clone.splice(0, chunkSize));
  }
  return results;
}

export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function setIntervalLimited(callback, interval, repetitions) {
  for (let i = 0; i < repetitions; i++) {
    setTimeout(callback, i * interval);
  }
}

export function log(varObj, label) {
  let name;
  for(let varName in varObj) {
    name = varName;
  }
  console.log(label || name, varObj[name]);
}

export function pushEvent(category, action, name, value) {
  if (window && window._paq)
    window._paq.push(['trackEvent', category, action, name, value])
}