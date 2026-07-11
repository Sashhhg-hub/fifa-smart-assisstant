import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:brightness-110',
  secondary:
    'glass text-gray-200 hover:border-white/20 hover:bg-white/10 hover:text-white',
  ghost: 'text-gray-400 hover:text-white',
};

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
