// 胎寬篩選器
export const widthFilters = [
  '155', '165', '175', '195', '205', '215', '225', '235', '245', '255', '285'
].map(w => ({
  title: w,
  slug: `width_${w}`,
}));

// 扁平比篩選器
export const aspectFilters = [
  '35', '40', '45', '50', '55', '60', '70'
].map(a => ({
  title: a,
  slug: `aspect_${a}`,
}));

// 輪圈尺寸篩選器（新增）
export const rimSizeFilters = [
  'R15', 'R16', 'R17', 'R18', 'R19', 'R20'
].map(r => ({
  title: r,
  slug: `rim_${r.toLowerCase()}`, // 例如 rim_r17
}));
