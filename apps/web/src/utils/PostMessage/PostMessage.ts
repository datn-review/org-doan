import type { TAction, TFunction, TPostMessageGFW } from '../../types';
import { IIFE } from '@utils/helper';
import { isDevEnv, isProdEnv } from '@utils/env';

export class PostMessage {
  private static __instance: PostMessage;
  private uri = '*';
  private queue = new Map<TPostMessageGFW, <T>(payload: T | any, self: PostMessage) => void>();

  private constructor() {
    const uri = IIFE(() => {
      if (isDevEnv) {
        return '*';
      }

      if (isProdEnv) {
        return '*';
      }
    });
    this.setUri(uri);
  }

  public static get Instance() {
    return this.__instance || (this.__instance = new this());
  }

  setUri(uri: string) {
    this.uri = uri;
    return this;
  }

  emit<T>(action: TAction<T>, func?: VoidFunction) {
    if (func) func();
    console.log(`=============== GFW::: Send message to parent: ${this.uri} ===============`);
    console.log('=============== GFW::: Send message to parent: ===============');

    window.parent.postMessage(action, this.uri);
    return this;
  }

  listen() {
    const fnEvent: TFunction<PostMessage> = (event: any, self: any) => {
      console.log('[list]', this.queue.keys());

      const fn = this.queue.get(event.data.type);
      if (fn) {
        console.log('=============== Starting ::: Receive message from [PARENT] ===============');
        console.log({
          message: event.data.type,
          payload: event.data.payload,
        });
        console.log('=============== End ===============');
        fn(event.data.payload, self);
      }
    };

    return this.addEvent(fnEvent);
  }

  addEvent(fn: TFunction<PostMessage>) {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return;
      fn(event, this);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      this.clear();
      window.removeEventListener('message', handleMessage);
    };
  }

  clear() {
    this.queue.clear();
  }
  listenChild() {
    //dul
  }

  on(message: TPostMessageGFW, fn: <T>(payload: T | any, self: PostMessage) => void) {
    this.queue.set(message, fn);
    return this;
  }

  manual(fn: TFunction<PostMessage>) {
    this.addEvent(fn);
    return this;
  }
}
