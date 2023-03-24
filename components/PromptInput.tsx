'use client';

import { useState } from 'react';
import useSWR from 'swr';
import fetchSuggestion from '@/lib/fetchSuggestion';

const PromptInput: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR('/api/suggestion', fetchSuggestion, { revalidateOnFocus: false });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = prompt;
    setPrompt('');

    const p = (useSuggestion ? suggestion : inputPrompt) as string;

    await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: p }),
    }).then((res) => res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  return (
    <div className='m-10'>
      <form
        className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'
        onSubmit={handleSubmit}
      >
        <textarea
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
          className='flex-1 p-4 outline-none rounded-md resize-none'
          placeholder={
            (loading && 'ChatGPT is thinking of a suggestion...') ||
            suggestion ||
            'Enter your prompt here...'
          }
        />
        <button
          type='submit'
          disabled={!prompt}
          className={`p-4 font-bold ${
            prompt
              ? 'bg-violet-500 text-white transition-colors duration-200'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          Generate
        </button>
        <button
          className='p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400'
          type='button'
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className='p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold'
          type='button'
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>
      {prompt && (
        <p className='italic pt-2 pl-2 font-light'>
          Suggestion:{' '}
          <span className='text-violet-500'>
            {loading ? 'ChatGPT is thinking...' : suggestion}
          </span>
        </p>
      )}
    </div>
  );
};

export default PromptInput;
