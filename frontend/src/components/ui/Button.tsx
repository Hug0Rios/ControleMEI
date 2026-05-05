import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md bg-[#172554] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#172554] dark:bg-blue-600 dark:hover:bg-blue-500 ${className}`}
      {...props}
    />
  );
}
