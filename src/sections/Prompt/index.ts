import { useRef } from 'react';
import { PromptRef } from '@/sections/Prompt/types';
import Prompt from './Prompt';

export function usePrompt() {
  const promptRef = useRef<PromptRef>(null);

  const prompt = (message: string, defaultValue?: string): Promise<string | void> => {
    return new Promise((resolve, reject) => {
      if (!promptRef.current) {
        return reject(new Error('Prompt ref is not set'));
      }

      promptRef.current.onSubmit((value) => {
        promptRef.current?.close();
        resolve(value);
      });
      promptRef.current.onDismiss(() => {
        promptRef.current?.close();
        resolve();
      });
      promptRef.current.open(message, defaultValue);
    });
  };

  return [prompt, promptRef] as const;
}

export default Prompt;
