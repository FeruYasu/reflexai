import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-ra-300',
    'active:opacity-80',
  ],
  variants: {
    variant: {
      primary: 'bg-green-ra-700 text-white hover:bg-green-ra-300',
      outline: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    isLoading?: boolean;
  };

export function Button({
  children,
  variant,
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={button({ variant, className })}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
}
