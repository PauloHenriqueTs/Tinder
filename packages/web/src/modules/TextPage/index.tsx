import * as React from "react";
import { Button } from "antd";

export const RedColor =
  "linear-gradient(to right, #FF7356 0%, #FE4C6A 50%, #FD267D 100%)";

export const BtnDeslike: React.SFC<any> = props => {
  return (
    <Button
      {...props}
      shape="circle"
      icon="close"
      type="primary"
      style={{
        background:
          "linear-gradient(to right, #FF7356 0%, #FE4C6A 50%, #FD267D 100%)",
        borderColor: "#FFFFFF",
        color: "#FFF"
      }}
    />
  );
};
export const BtnDeslike1: React.SFC<any> = props => {
  return (
    <Button
      {...props}
      shape="circle"
      icon="close"
      type="normal"
      style={{
        color: "#FF7356",
        borderColor: "#FFFFFF"
      }}
    />
  );
};

export const Btnlike: React.SFC<any> = props => {
  return (
    <Button
      {...props}
      shape="circle"
      icon="heart"
      type="primary"
      style={{
        background:
          "linear-gradient(to right, #14E29A 0%, #36E8B9 50%, #58EED7 100%)",
        borderColor: "#FFFFFF",
        color: "#FFF"
      }}
    />
  );
};
export const Btnlike1: React.SFC<any> = props => {
  return (
    <Button
      {...props}
      shape="circle"
      icon="heart"
      type="primary"
      style={{ color: "#36E8B9", borderColor: "#FFFFFF" }}
    />
  );
};
export const BtnBack: React.SFC<any> = props => {
  return <Button {...props} shape="circle" icon="left" type="primary" />;
};

export class Demo extends React.Component<any> {
  render() {
    return (
      <div style={{ display: "flex", backgroundColor: "#000" }}>
        <BtnDeslike />
        <BtnDeslike1 />
        <Btnlike />
        <Btnlike1 />
        <BtnBack />
      </div>
    );
  }
}
