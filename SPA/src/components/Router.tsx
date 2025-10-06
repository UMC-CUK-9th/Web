export const getCurrentPath = (): string => window.location.pathname;

export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
};