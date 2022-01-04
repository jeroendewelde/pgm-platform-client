import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import { BackupTableIcon } from '@mui/icons-material';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import AltRouteIcon from '@mui/icons-material/AltRoute';
// import RouteIcon from '@mui/icons-material/Route';
import BusinessIcon from '@mui/icons-material/Business';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupsIcon from '@mui/icons-material/Groups';
// import PeopleIcon from '@mui/icons-material/People';

import { 
  FiBook 
} from "react-icons/fi";
import { Link } from '@mui/material';


export const mainListItems = (
  <div>
    <Link href="/admin/course">

    <ListItem button>
      <ListItemIcon>
        <CollectionsBookmarkIcon />
      </ListItemIcon>
      <ListItemText primary="Vakken" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <BackupTableIcon />
      </ListItemIcon>
      <ListItemText primary="Projecten" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <HistoryEduIcon />
      </ListItemIcon>
      <ListItemText primary="Docenten" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Studenten" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Leerlijnen" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AltRouteIcon />
      </ListItemIcon>
      <ListItemText primary="Afstudeerrichtingen" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BusinessIcon />
      </ListItemIcon>
      <ListItemText primary="Bedrijven" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AttachmentIcon />
      </ListItemIcon>
      <ListItemText primary="Bijlagen" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Generaties" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Personen" />
    </ListItem>




    {/* <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem> */}
    {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
