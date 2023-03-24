import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between p-5 sticky top-0 bg-white z-50 shadow-md">
      <div className='flex space-x-2 items-center'>
        <Image
          src='https://links.papareact.com/4t3'
          alt='Logo'
          width={30}
          height={30}
        />
        <div>
          <h1 className='font-bold'>
            The <span className='text-violet-500'>AI</span> Image Generator
          </h1>
          <h2 className='text-xs'>Powered by DALL·E, Chat GPT, and AWS!</h2>
        </div>
      </div>
      <div className="flex text-sm md:text-base divide-x items-center text-gray-500">
        <Link
          href='https://openai.com/product/dall-e-2'
          className='px-2 font-light text-right'
        >
          DALL·E
        </Link>
        <Link
          href='https://github.com/Zeztron/dall-e-serverless'
          className='px-2 font-light text-right'
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
};

export default Header;
