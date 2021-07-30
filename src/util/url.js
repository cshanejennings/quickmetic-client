export const sanitize_query_string = (s) => {
  return s.slice(1).split("&amp;").join('&').split('&');
}

export const parse_query_string = (s) => {
  return sanitize_query_string(s).reduce((pms, p)=> {
    const parts = p.split('=');
    const key = parts[0];
    const val = decodeURIComponent(parts[1]).replace(/\+/g, ' ').trim();
    return {...pms, [key]: val}
  }, {});
}
