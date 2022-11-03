function getPageHeight(topBarHeight: number): string {
  return `calc(100vh - ${topBarHeight}px)`;
}

export { getPageHeight };
