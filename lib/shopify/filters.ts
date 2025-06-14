export const widthFilters = [
  '155', '165', '175', '195', '205', '215', '225', '235', '245', '255', '285'
].map(w => ({
  title: w,
  slug: `width_${w}`,
}));

export const aspectFilters = [
  '35', '40', '45', '50', '55', '60', '70'
].map(a => ({
  title: a,
  slug: `aspect_${a}`,
}));
