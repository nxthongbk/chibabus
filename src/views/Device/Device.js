import React,{useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from '../../service/axiosInstance';
import {connect} from 'react-redux';
import {  
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';
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
  const [license_plate, setLicensePlate] = React.useState("")
  const [driver, setDriver] = React.useState("")

  useEffect(() => {
    getData() 
  }, [])

  const getData = async ()=>{
    var data = await axios().get('/device')
    props.updateDevice(data.data)
  }

  const toggle = () => setModal(!modal);
  const submitForm = () =>{
    setModal(!modal);
    axios().post('/device',{
        license_plate,
        driver
    }).then(res=>{getData()})
    .catch(err=>console.log(err))
  }

  const inputChange = (e) =>{
      switch(e.target.name){
          case 'license_plate':
              setLicensePlate(e.target.value);
              break;
          case 'driver': 
              setDriver(e.target.value)
      }
  }

  const showDevices = ()=>{
    const a =props.devices && props.devices.map((device, index)=>{
      return [device._id, device.license_plate, device.driver, device.timestamp]
    })
    return a;
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Button color="success" onClick={toggle}> + ADD</Button>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Device</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a device information table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "LICENSE PLATE", "DRIVER", "TIME", ""]}
              tableData={showDevices()}
            />
          </CardBody>
        </Card>
      </GridItem>
        <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>ADD DEVICE</ModalHeader>
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
                </Form>
                <ModalFooter>
                <Button color="primary" type="submit" onClick={submitForm}>Submit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
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
    updateDevice : (devices)=>{
        dispatch({type:"UPDATE_DEVICE", devices})
    }
})

export default connect(mapState,mapDispatch)(Device)