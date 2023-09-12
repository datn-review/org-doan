import { Spinner as SpinnerBase } from '@chakra-ui/react';

const Spinner = () => {
  return (
    <div className='h-[500px] w-[100%] flex justify-center items-center mt-[-10px]'>
      <SpinnerBase
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        className='h-[30px] w-[30px]'
      />
    </div>
  );
};
export default Spinner;
