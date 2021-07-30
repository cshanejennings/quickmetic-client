const NAMESPACE = {
  STORE_APP: false,
  STORE_USER: false,
  SERVER_CONNECTION: false,
  STORE_THREADS: false,
}


export const get_logger = (ns) => {
  return {
    log: (...args) => (NAMESPACE[ns]) ? console.log(...args) : '',
    warn: (...args) => (NAMESPACE[ns]) ? console.warn(...args) : '',
    error: (...args) => (NAMESPACE[ns]) ? console.error(...args) : '',
  }
}
