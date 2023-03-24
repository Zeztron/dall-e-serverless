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

  return (
    <div className='m-10'>
      <form className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'>
        <textarea
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(e.target.value)
          }
          className='flex-1 p-4 outline-none rounded-md resize-none'
          placeholder='Enter a prompt...'
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
        >
          Use Suggestion
        </button>
        <button
          className='p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold'
          type='button'
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
};

export default PromptInput;
