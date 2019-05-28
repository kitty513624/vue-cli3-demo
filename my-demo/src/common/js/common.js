/**
 * 存储localStorage
 */
export const setLocalStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    const contentStr = JSON.stringify(content);
    window.localStorage.setItem(name, contentStr);
  } else {
    window.localStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage
 */
export const getLocalStorage = (name) => {
  if (!name) return '';
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeLocalStorage = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 存储sessionStorage
 */
export const setSessionStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    const contentStr = JSON.stringify(content);
    window.sessionStorage.setItem(name, contentStr);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取sessionStorage
 */
export const getSessionStorage = (name) => {
  if (!name) return '';
  return window.sessionStorage.getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = (name) => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};
