// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import UserView from 'src/views/apps/user/view/UserViewPage'
import UserList from '../apps/user/list'


const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='Gestionar Pacientes Registrados' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>Aqui puede gestionar a los pacientes del sistema y su informacion</Typography>
          </CardContent>
        </Card>
      </Grid>
        <Grid item md={12} xs={12}>
          <Card>
            <UserList></UserList>
          </Card>
        </Grid>
    </Grid>
  )
}

export default ACLPage
