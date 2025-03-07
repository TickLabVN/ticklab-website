import { Button } from '@payloadcms/ui'
import React from 'react'

const LoginWithOAuth2: React.FC = () => {
  return (
    <div>
      <p className='text-center'>or login with</p>
      <div className='flex justify-center items-center w-full gap-4'>
        <Button buttonStyle='secondary' size='large' className='flex-1'>
          <img src='/google-icon-logo.svg' alt="Google Icon" width={24} height={24} />
        </Button>
        <Button buttonStyle='secondary' size='large' className='flex-1'>
          <img src='/discord-icon.svg' alt="Google Icon" width={24} height={24} />
        </Button>
      </div>
    </div>
  )
}

export default LoginWithOAuth2
