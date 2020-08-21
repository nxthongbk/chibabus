import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {connect} from 'react-redux';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { getAllJSDocTags } from "typescript";
import axios from "service/axiosInstance";
import Axios from "axios";

import timeFormat from '../../service/timeFormat';

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();

  const [id, setID] = React.useState("");
  const [state, setState] = React.useState("");
  const [image, setImage] = React.useState("");
  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState(false);
  const [bus, setBus] = React.useState("");
  const [time, setTime] = React.useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var data = await axios().get('/buscounter');
    console.log(data.data);
    props.updateBusCounter(data.data);
  }

  //convert state from text to icon 
  const customerState = (state) => {
    if (state === "up") {
      return <img src="/material-dashboard-react/images/get_on_bus.jpg" width="25px" />
    }
    return <img src="/material-dashboard-react/images/get_off_bus.jpg" width="25px" />;
  }

  const showBusCounter = () => {
    const a = props.buscounter && props.buscounter.map((customer, index) => {
      return [
        customer._id,
        customerState(customer.state),
        customer.image,
        customer.lat,
        customer.long,
        customer.age,
        customer.gender ? "Male" : "Female",
        customer.device_id.license_plate,
        timeFormat(customer.timestamp)
      ]
    })
    return a;
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Customer Stats</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "State", "Image", "Latitude", "Longtitude", "Age", "Gender", "Bus", "Time"]}
                tableData={showBusCounter()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapState = state => ({
  buscounter: state.buscounter
})

const mapDispatch = dispatch => ({
  updateBusCounter : (buscounter) => {
    dispatch({type:"UPDATE_BUSCOUNTER", buscounter});
  }
})

export default connect(mapState,mapDispatch)(Dashboard)
