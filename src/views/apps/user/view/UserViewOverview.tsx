// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Component Imports
import UsersInvoiceListTable from 'src/views/apps/user/view/UsersInvoiceListTable'
import UsersProjectListTable from 'src/views/apps/user/view/UsersProjectListTable'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { AnyAbility } from '@casl/ability'
import { Context, useContext } from 'react'

interface Props {
  invoiceData: InvoiceType[]
}

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

const UserViewOverview = ({ invoiceData }: Props) => {
  const ability = useContext(AbilityContext);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersProjectListTable/>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  )
}
UserViewOverview.acl = {
  action: 'read',
  subject: 'user-view-overview'
};

export default UserViewOverview;

