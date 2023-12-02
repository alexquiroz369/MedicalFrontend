// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  ID_Paciente: number
  Nombre: string
  Edad: number
  Sexo: string
  Domicilio: string
  Carnet: string
  active: boolean
  contacto: string | null
  avatar: string
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
