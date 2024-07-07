import { Schema } from 'redis-om'

const sessionSchema = new Schema('EmployeesManagementSession', {
  userId: { type: 'string' },
  accessToken: { type: 'string' },
  refreshToken: { type: 'string' },
  accessTokenExp: { type: 'number' },
  refreshTokenExp: { type: 'number' },
  userRole: { type: 'string' },
})

export default sessionSchema
