// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useContext } from 'react'

import { AbilityContext } from 'src/layouts/components/acl/Can'
// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}


const UserView = ({ tab, invoiceData }: Props) => {
const ability = useContext(AbilityContext);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

UserView.acl = {
  action: 'read',
  subject: 'user-view'
};

export default UserView
