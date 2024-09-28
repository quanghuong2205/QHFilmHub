export const sendEvent = (eventName: string, detail?: any, context = document) => {
  context.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const listenEvent = (eventName: string, handler: (e: Event) => void, context = window) => {
  context.addEventListener(eventName, handler);
  return () => {
    context.removeEventListener(eventName, handler);
  };
};
