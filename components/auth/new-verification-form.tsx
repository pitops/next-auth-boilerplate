'use client'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { newVerificationAction } from '@/actions/new-verification-action'
import { FormSuccess } from '@/components/form-success'
import { FormError } from '@/components/form-error'

interface NewVerificationFormProps {}

export const NewVerificationForm: React.FC<NewVerificationFormProps> = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const submitAlreadyCalledRef = useRef<boolean>(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!')
      return
    }
    newVerificationAction(token)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
      .catch(() => setError('Something went wrong!'))
  }, [token])

  useEffect(() => {
    // this is being added because in strict mode useEffect is triggered twice
    // so it gives wrong result, hence the check here
    if (submitAlreadyCalledRef.current) {
      return
    }
    onSubmit()
    submitAlreadyCalledRef.current = true
  }, [onSubmit, submitAlreadyCalledRef])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
