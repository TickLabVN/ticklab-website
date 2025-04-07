'use client'
import React, { useEffect, useRef } from 'react'
import katex from 'katex'

export type EquationBlockProps = {
  equation: string
}

type Props = EquationBlockProps & {
  className?: string
}

export const EquationBlock: React.FC<Props> = ({ equation, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(equation, containerRef.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [equation]);

  return <div className={className} ref={containerRef} />
}
