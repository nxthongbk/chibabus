import React, { useEffect } from "react";
import AWS from "aws-sdk";
// @material-ui/icon
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ButtonCustom from "components/CustomButtons/Button.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Redirect } from 'react-router-dom';
import SortIcon from '@material-ui/icons/UnfoldMore';
import axios from '../../service/axiosInstance';
import { connect } from 'react-redux';

// services
import timeFormat from '../../service/timeFormat';
import ExportCSV from '../../service/exportCSV';
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

AWS.config.update({
  accessKeyId: 'AKIAYOY43EWEA55VNDO3',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
});

const s3 = new AWS.S3();

function Customer(props) {
  const classes = useStyles();
  const {
    className
  } = props;

  const [sortState, setSortState] = React.useState(true);

  const getData = async () => {
    let listofcustomers;
    s3.listObjectsV2({Bucket: 'chibabus'}, function(err, data) {
      if (err) return console.log(err);
      listofcustomers = data.Contents;      
      props.updateCustomers(listofcustomers);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //sort data by property
  const sortData = (sortOn) => {
    let collection = props.customers;
    switch (sortOn) {
      case "time":
        if (sortState) {
          let collSort = collection.sort((a, b) => {
            return new Date(b.LastModified) - new Date(a.LastModified);
          })
          setSortState(!sortState);
          props.updateCustomers(collSort);
        } else {
          let collSort = collection.sort((a, b) => {
            return new Date(a.LastModified) - new Date(b.LastModified);
          })
          setSortState(!sortState);
          props.updateCustomers(collSort);
        }
        break;
    }
  };
  //pre-process header for table
  const UploadTimeHeader = (<div>UPLOAD TIME <SortIcon onClick={() => sortData("time")} role="button" /></div>);

  const showCustomerHeader = ["IMAGE", UploadTimeHeader];

  //pre-process data for table
  const showCollection = () => {
    const a = props.customers && props.customers.map((customer, index) => {
      return [
        <img src={"http://labtma.com:7010/uploads/" + customer.Key} width="30%" alt="customer" />,
        timeFormat(customer.LastModified)
      ]
    });
    console.log(a);
    return a;
  };

  if (!props.isLogin) return <Redirect to="/login" />
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Customers</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a customer collection table
            </p>
          </CardHeader>
          <CardBody>
            {/* <ExportCSV csvHeader={} csvData={} fileName="Devices" /> */}
            <Table
              tableHeaderColor="primary"
              tableHead={showCustomerHeader}
              tableData={showCollection()}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
const mapState = state => ({
  customers: state.customers,
  isLogin: state.isLogin
});

const mapDispatch = dispatch => ({
  updateCustomers: (customers) => {
    dispatch({ type: "UPDATE_CUSTOMERS", customers })
  },
  setLogin: (login) => {
    dispatch({ type: "SET_LOGIN", login })
  }
})

export default connect(mapState, mapDispatch)(Customer)