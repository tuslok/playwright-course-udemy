export const isDektopViewport = (page) => {
  const size = page.viewportSize();
  return size.width >= 600;
};
