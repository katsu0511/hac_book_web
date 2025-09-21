import { ChangeEvent } from "react";

export default function Input(props: {label: string, type: string, value: string, autoComplete: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div className='flex justify-center items-center py-2'>
      <label className='block w-20'>{props.label}: </label>
      <input
        type={props.type}
        className='border-blue-500 border-2 px-2 py-1 outline-none appearance-none'
        value={props.value}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
        required
      />
    </div>
  );
}
