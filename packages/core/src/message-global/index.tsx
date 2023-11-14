import { message } from '@org/ui';

export function useMessageHook(): any {
  const [messageApi, contextHolder] = message.useMessage();
  const messageSuccess = (content: string, duration = 3) => {
    messageApi
      .open({
        type: 'success',
        content: content,
        duration: duration,
      })
      .then((r) => console.log(r));
  };
  const messageError = (content: string, duration = 3) => {
    messageApi
      .open({
        type: 'error',
        content: content,
        duration: duration,
      })
      .then((r) => console.log(r));
  };
  return {
    contextHolder,
    messageApi,
    messageSuccess,
    messageError,
  };
}
