export const isUrl = (str: string) => {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

export function getQueryStringByName(name: string): string {
  const result = (location.search || location.hash).match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1] ? result[1]?.replace(/\//, '') : '';
}