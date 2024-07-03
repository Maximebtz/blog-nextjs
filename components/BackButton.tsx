import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Link href={href}>
      {label}
    </Link>
  )
}

export default BackButton;