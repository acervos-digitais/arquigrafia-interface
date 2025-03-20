const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

Math.map = function (value, start1, stop1, start2, stop2, withinBounds = false) {
  let result = (value - start1) * (stop2 - start2) / (stop1 - start1) + start2;
  if (withinBounds) {
    if (start2 < stop2) result = Math.max(Math.min(result, stop2), start2);
    else result = Math.max(Math.min(result, start2), stop2);
  }
  return result;
}