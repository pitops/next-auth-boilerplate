import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FaExclamationTriangle } from 'react-icons/fa'

interface ErrorCardProps {}

export const ErrorCard: React.FC<ErrorCardProps> = (props) => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <FaExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
