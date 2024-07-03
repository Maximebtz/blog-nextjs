import Link from 'next/link'
import React from 'react'
import { cn } from "@/lib/utils";
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
    "inline-flex justify-center items-center w-max px-4 py-2 rounded-full gap-2 border text-white font-bold transition duration-200 ease-in-out cursor-pointer hover:opacity-80",
    {
        variants: {
            size: {
                sm: "text-sm",
                md: "text-md",
                xl: "text-xl"
            },
            variant: {
                basic: "bg-zinc-950 hover:bg-zinc-900",
                success: "bg-green-600 hover:bg-green-800",
                warning: "bg-red-600 hover:bg-red-800",
            },
        },
        defaultVariants: {
            variant: "basic",
            size: "md"
        }
    }
)

interface BackButtonProps extends VariantProps<typeof buttonVariants> {
  label: string; // Label du bouton
  href: string; // Lien du bouton
}

const BackButton = ({ label, href, variant, size }: BackButtonProps) => {
  return (
    <Link href={href} className={cn(buttonVariants({ variant }))}>
      {label}
    </Link>
  )
}

export default BackButton;