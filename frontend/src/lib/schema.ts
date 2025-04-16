import { z } from 'zod'

const passwordValidation = /^(?=.*[^a-zA-Z0-9]).{6,}$/

const userSchema = z.object({
  username: z
    .string()
    .min(1, 'username is required')
    .min(2, 'Name must be atleast 2 characters long'),
  email: z.string().email('Invalid Email Address'),
  password: z.string().regex(passwordValidation, {
    message:
      'password must contain minimum of 6 characters and a special charcter',
  }),
  confirmPassword: z.string(),
})

const refinedSchema = userSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
)

export default refinedSchema
