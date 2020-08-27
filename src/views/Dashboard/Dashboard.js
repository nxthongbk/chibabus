import React, { useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import DirectionBus from '@material-ui/icons/DirectionsBus';
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import AccessibleIcon from '@material-ui/icons/Accessible';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
// redux
import { connect } from 'react-redux';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// chart data
import {
  dailyCustomerChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// services
import axios from "service/axiosInstance";
import timeFormat from '../../service/timeFormat';
import ExportCSV from '../../service/exportCSV';

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  const {
    className
  } = props;

  const [modal, setModal] = React.useState(false);
  const [imageURL, setImageURL] = React.useState("");
  const [totalCustomer, setTotalCustomer] = React.useState(0);
  const [todayCustomer, setTodayCustomer] = React.useState(0);
  const [customerLeftToday, setCustomerLeftToday] = React.useState(0);
  const [upTime, setUpTime] = React.useState();

  useEffect(() => {
    getData();
  }, []);

  //get data from server
  const getData = async () => {
    let buscounter;
    await axios().get('/buscounter').then(res => buscounter = res).catch(err => console.log(err));
    props.updateBusCounter(buscounter.data);
    setTotalCustomer(Math.round(buscounter.data.length / 2));
    customerToday(buscounter.data);

    let customerOnDay;
    await axios().get('/buscounter/statistic/customer_on_day').then(res => customerOnDay = res).catch(err => console.log(err));
    props.updateCustomerOnDay(customerOnDay.data);

    var customerOnMonth;
    await axios().get('/buscounter/statistic/customer_on_month').then(res => customerOnMonth = res).catch(err => console.log(err));
    props.updateCustomerOnMonth(customerOnMonth.data);
  };

  //pre-process data for card info
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const customerToday = (buscounter) => {
    let today = new Date();
    setUpTime(today.toLocaleString());
    let current = 0;
    let left = 0;
    const arr = buscounter.map((customer, index) => {
      let customerDate = new Date(customer.timestamp);
      if (datesAreOnSameDay(today, customerDate)) {
        if (customer.state == "up") {
          current += 1;
        } else {
          left += 1;
        }
      }
    });
    setTodayCustomer(current);
    setCustomerLeftToday(left);
  };

  //convert state from text to icon 
  const customerState = (state) => {
    if (state === "up") {
      return <img src="/images/get_on_bus.jpg" width="25px" alt="Up" />;
    }
    return <img src="/images/get_off_bus.jpg" width="25px" alt="Down" />;
  };

  //pre-process data for table
  const showBusCounter = () => {
    const arr = props.buscounter && props.buscounter.map((customer, index) => {
      //handle image
      let imgURL;
      if (customer.image === "unknow_image")
        imgURL = "/images/upload-failed.jpg";
      else
        imgURL = "http://labtma.com:7010/uploads/" + customer.image;

      return [
        customer._id,
        customerState(customer.state),
        customer.lat,
        customer.long,
        customer.age,
        customer.gender ? "Male" : "Female",
        customer.device_id.license_plate,
        timeFormat(customer.timestamp),
        <img
          src={imgURL}
          onClick={() => customerImage(imgURL)}
          width="100px" />
      ];
    });
    return arr;
  };

  // export csv
  const csvHeaderData = [
    { label: "ID", key: "_id" },
    { label: "STATE", key: "state" },
    { label: "LATITUDE", key: "lat" },
    { label: "LONGTITUDE", key: "long" },
    { label: "AGE", key: "age" },
    { label: "GENDER", key: "gender" },
    { label: "BUS", key: "bus" },
    { label: "TIME", key: "time" },
    { label: "IMAGE", key: "image" }
  ];

  const csvBodyData = () => {
    const arr = props.buscounter.map((customer, index) => {
      return {
        "_id": customer._id,
        "state": customer.state,
        "lat": customer.lat,
        "long": customer.long,
        "age": customer.age,
        "gender": customer.gender ? "Male" : "Female",
        "bus": customer.device_id.license_plate,
        "time": timeFormat(customer.timestamp),
        "image": "http://labtma.com:7010/uploads/" + customer.image
      }
    });
    return arr;
  };

  //toggle customer image
  const toggle = () => setModal(!modal);
  const customerImage = (imageURL) => {
    setModal(!modal);
    setImageURL(imageURL);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <DirectionBus />
              </CardIcon>
              <p className={classes.cardCategory}>Today</p>
              <h3 className={classes.cardTitle}>
                {todayCustomer}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {upTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AccessibleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Currently On Bus</p>
              <h3 className={classes.cardTitle}>{todayCustomer - customerLeftToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {upTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ExitToAppIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Customer Left</p>
              <h3 className={classes.cardTitle}>{customerLeftToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {upTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PeopleIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total customers</p>
              <h3 className={classes.cardTitle}>{totalCustomer}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                {upTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailyCustomerChart(props.customeronday).data}
                type="Line"
                options={dailyCustomerChart(props.customeronday).options}
                listener={dailyCustomerChart(props.customeronday).animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Amount of Customer in past 7 days</h4>
              {/* <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p> */}
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {upTime}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dailyCustomerChart(props.customeronmonth).data}
                type="Line"
                options={dailyCustomerChart(props.customeronmonth).options}
                listener={dailyCustomerChart(props.customeronmonth).animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Total Customers per Month</h4>
              {/* <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p> */}
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {upTime}
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
              <ExportCSV csvHeader={csvHeaderData} csvData={csvBodyData()} fileName="Customer_Stats" />
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "State", "Latitude", "Longtitude", "Age", "Gender", "Bus", "Time", "Image"]}
                tableData={showBusCounter()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>
            Customer Image
          </ModalHeader>
          <ModalBody>
            <Card>
              <img top width="100%" src={imageURL} alt="Customer Image" onError={(e) => e.target.src = "/images/upload-failed.jpg"} />
            </Card>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

const mapState = state => ({
  buscounter: state.buscounter,
  customeronday: state.customeronday,
  customeronmonth: state.customeronmonth
});

const mapDispatch = dispatch => ({
  updateCustomerOnDay: (customeronday) => {
    dispatch({ type: "UPDATE_CUSTOMERONDAY", customeronday });
  },

  updateCustomerOnMonth: (customeronmonth) => {
    dispatch({ type: "UPDATE_CUSTOMERONMONTH", customeronmonth });
  },

  updateBusCounter: (buscounter) => {
    dispatch({ type: "UPDATE_BUSCOUNTER", buscounter });
  }
});

export default connect(mapState, mapDispatch)(Dashboard)
