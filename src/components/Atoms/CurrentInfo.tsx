export default function CurrentInfo({ infoType, info }: { infoType: string, info: string }) {
  return <p className='text-xl font-bold'>Current {infoType}: {info}</p>;
}
