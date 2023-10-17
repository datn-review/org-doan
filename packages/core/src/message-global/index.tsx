import { message } from '@org/ui';

export function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();
  const messageSuccess = (content: string, duration = 3) => {
    messageApi.open({
      type: 'success',
      content: content,
      duration: duration,
    });
  };
  const messageError = (content: string, duration = 3) => {
    messageApi.open({
      type: 'error',
      content: content,
      duration: duration,
    });
  };
  return {
    contextHolder,
    messageApi,
    messageSuccess,
    messageError,
  };
}
