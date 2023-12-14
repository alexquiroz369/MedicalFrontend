// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'inicio',
      path: '/home',
      icon: 'mdi:home-outline',
    },
    {
      title: 'Registrar Nuevo Paciente',
      path: '/create-pacient',
      icon: 'mdi:human',
    },
    {
      title: 'Ver Pacientes',
      path: '/test',
      icon: 'mdi:human-male-female',
    },
    {
      title: 'User list',
      path: '/show-pacients',
      icon: 'mdi:email-outline',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
