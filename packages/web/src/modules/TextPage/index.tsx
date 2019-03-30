import * as React from "react";
import { GeolocatedProps, geolocated } from "react-geolocated";

class Demo extends React.Component<GeolocatedProps> {
  componentDidUpdate() {
    let i = 0;
    console.log(this.props.coords, i);
    i++;
  }
  render() {
    return <div>lattitude:</div>;
  }
}

export const TextPage = geolocated()(Demo);
