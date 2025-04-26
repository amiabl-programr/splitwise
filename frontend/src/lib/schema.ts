import { z } from 'zod'

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/
const userSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid Email Address'),
  password: z.string().regex(passwordValidation, {
    message:
      'Password must be at least 6 characters and include a special character',
  }),
  confirmPassword: z.string(),
})

const refinedSchema = userSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.password !== data.email, {
    message: 'Password must not be the same as email',
    path: ['password'],
  })

export default refinedSchema
