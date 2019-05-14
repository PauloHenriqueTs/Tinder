import * as React from "react";
import Swipeable from "react-swipy";
import styled from "styled-components";

import Card from "./Card";
import Button from "./Button";

const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12
};
const Wrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;
class App extends React.Component<any, any> {
  state = {
    cards: ["First", "Second", "Third"]
  };

  remove = () =>
    this.setState(({ cards }) => ({
      cards: cards.slice(1, cards.length)
    }));

  render() {
    return (
      <div>
        <Wrapper>
          <Wrapper>
            <Swipeable
              buttons={({ left, right }) => (
                <div style={actionsStyles}>
                  <Button onClick={left}>Reject</Button>
                  <Button onClick={right}>Accept</Button>
                </div>
              )}
              onSwipe={e => (e === "left" ? console.log(e) : console.log(e))}
            >
              <Card>gdfgdfgdfg</Card>
            </Swipeable>
          </Wrapper>
        </Wrapper>
      </div>
    );
  }
}

export default App;
