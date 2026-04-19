'use client'

import { Button } from '@/components/ui/Button'

export function CopyEmailButton() {
  return (
    <Button
      variant="white"
      onClick={() => {
        navigator.clipboard.writeText('evanditoevan@gmail.com')
      }}
      style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
    >
      Copy Email
    </Button>
  )
}
