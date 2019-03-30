import * as React from "react";
import { FieldProps } from "formik";
import { GeolocatedProps, geolocated } from "react-geolocated";
interface State {
  i: boolean;
}
export class C extends React.PureComponent<
  FieldProps<any> & GeolocatedProps,
  State
> {
  state: State = {
    i: true
  };
  componentDidUpdate() {
    if (this.props.coords && this.state.i) {
      const {
        form: { setValues, values }
      } = this.props;
      setValues({
        ...values,
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude
      });
      this.setState({ i: false });
    }
  }
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div />
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export const LocationField = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  watchPosition: false,
  userDecisionTimeout: 5000
})(C);
