interface IProps {
  copyRight?: string;
  grade: string;
  urlImage: string;
}
function Footer({ copyRight = '', urlImage, grade }: IProps) {
  return (
    <div className='flex items-end justify-between px-2 pb-4'>
      <div className='flex items-end'>
        <img
          src={urlImage}
          width={160}
          height={40}
        />
        <div className='leading-[15px] text-[15px]'>{grade}</div>
      </div>
      <div
        className='leading-[13px] text-[13px]'
        dangerouslySetInnerHTML={{ __html: copyRight }}
      />
    </div>
  );
}

export default Footer;
