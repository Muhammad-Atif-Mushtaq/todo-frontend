import Image from 'next/image';

const Header = () => {

  return (
    <div className="bg-[#0D0D0D] w-full h-[200px] flex items-center justify-center">
       <div className='flex items-center gap-[12px]'>
        <Image width={22} height={36} src="/rocket.svg" alt="logo" />
      <p className="text-[#4EA8DE] font-[900] text-[40px]">Todo <span className='text-[#5E60CE]'>App</span></p>
       </div>
    </div>
  );
};

export default Header;
