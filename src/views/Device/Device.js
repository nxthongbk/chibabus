import React, { useEffect } from "react";
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
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';
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

function Device(props) {
  const classes = useStyles();
  const {
    className
  } = props;

  const [modal, setModal] = React.useState(false);
  const [license_plate, setLicensePlate] = React.useState("");
  const [driver, setDriver] = React.useState("");
  const [line, setLine] = React.useState("");
  const [isModify, setModify] = React.useState(false);
  const [deviceIDActive, setDeviceID] = React.useState("");

  const getData = async () => {
    var data = await axios().get('/device')
    props.updateDevice(data.data)
  };

  useEffect(() => {
    getData();
  }, []);


  const toggle = () => setModal(!modal);

  const toggleAdd = () => {
    setModal(!modal);
    setModify(false);
    clearInput();
  };

  const toggleModify = (device_id, license, driver, line) => {
    setModal(!modal);
    setModify(true);
    setDeviceID(device_id);
    setLicensePlate(license);
    setDriver(driver);
    setLine(line);
  };

  const clearInput = () => {
    setDriver("");;
    setLicensePlate("");
    setLine("");
  };

  const submitForm = () => {
    setModal(!modal);
    if (!isModify) {
      axios().post('/device', {
        license_plate,
        driver,
        line
      }).then(() => { getData() })
        .catch(err => console.log(err));
      clearInput();
      return;
    };

    axios().put(`/device/id/${deviceIDActive}`, {
      license_plate,
      driver,
      line
    }).then(() => { getData() })
      .catch(err => console.log(err));
    clearInput();
    return;

  };

  const inputChange = (e) => {
    switch (e.target.name) {
      case 'license_plate':
        setLicensePlate(e.target.value);
        break;
      case 'driver':
        setDriver(e.target.value);
        break;
      case 'line':
        setLine(e.target.value);
        break;
      default:
    }
  };

  const deleteDevice = (device) => {
    var result = window.confirm("ARE YOU SURE")
    if (result) {
      axios().delete('/device', {
        data: { id: device }
      }).then(() => { getData() })
        .catch(err => console.log(err));
    }
  };

  const showDevices = () => {
    const a = props.devices && props.devices.map((device, index) => {
      return [
        device._id, device.license_plate, device.driver, device.line,
        <img src="/images/tick.svg" alt="" width="25px" />,
        timeFormat(device.timestamp),
        <div>
          <ButtonCustom size="sm" onClick={() => toggleModify(device._id, device.license_plate, device.driver, device.line)} color="success" justIcon>
            <i className="fas fa-wrench"></i>
          </ButtonCustom>
          {" "}
          <ButtonCustom size="sm" onClick={() => deleteDevice(device._id)} color="danger" justIcon>
            <i className="fas fa-trash-alt"></i>
          </ButtonCustom>
        </div>
      ]
    });
    return a;
  };

  const csvHeaderData = [
    { label: "ID", key: "_id" },
    { label: "LICENSE PLATE", key: "license_plate" },
    { label: "DRIVER", key: "driver" },
    { label: "LINE", key: "line" },
    { label: "TIME", key: "time" }
  ];
  const csvBodyData = () => {
    const arr = props.devices.map((device, index) => {
      return {
        "_id": device._id,
        "license_plate": device.license_plate,
        "driver": device.driver,
        "line": device.line,
        "time": timeFormat(device.timestamp)
      };
    });
    return arr;
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <ButtonCustom size="sm" onClick={toggleAdd} color="primary"> + ADD</ButtonCustom>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Device</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a device information table
            </p>
          </CardHeader>
          <CardBody>
            <ExportCSV csvHeader={csvHeaderData} csvData={csvBodyData()} fileName="Devices" />
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "LICENSE PLATE", "DRIVER", "LINE", "ACTIVE", "TIME", "OPTIONS"]}
              tableData={showDevices()}
            />
          </CardBody>
        </Card>
      </GridItem>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>
            {isModify ? "MODIFY DEVICE" : "ADD DEVICE"}
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>License Plate</Label>
                <Input
                  type="text"
                  name="license_plate"
                  placeholder="Enter license plate..."
                  onChange={inputChange}
                  value={license_plate}
                />
              </FormGroup>
              <FormGroup>
                <Label>Driver</Label>
                <Input
                  type="text"
                  name="driver"
                  placeholder="Enter driver..."
                  onChange={inputChange}
                  value={driver}
                />
              </FormGroup>
              <FormGroup>
                <Label>Line</Label>
                <Input
                  type="text"
                  name="line"
                  placeholder="Enter line..."
                  onChange={inputChange}
                  value={line}
                />
              </FormGroup>
            </Form>
            <ModalFooter>
              <ButtonCustom color="primary" type="submit" onClick={submitForm}>Submit</ButtonCustom>{' '}
              <ButtonCustom color="secondary" onClick={toggle}>Cancel</ButtonCustom>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </GridContainer>
  );
}
const mapState = state => ({
  devices: state.devices
})
const mapDispatch = dispatch => ({
  updateDevice: (devices) => {
    dispatch({ type: "UPDATE_DEVICE", devices })
  }
})

export default connect(mapState, mapDispatch)(Device)