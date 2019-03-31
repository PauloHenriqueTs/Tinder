import * as React from "react";
import { Card } from "antd";
import { withFindmatches, WithFindMatches } from "@tinder/controller";
import { Link } from "react-router-dom";

const { Meta } = Card;

class C extends React.PureComponent<WithFindMatches> {
  render() {
    const { matches, loading } = this.props;
    return (
      <div>
        {loading && <div>...loading</div>}
        {matches.map(l => (
          <Card
            key={`${l.id}-card`}
            hoverable={true}
            style={{ width: 240 }}
            cover={l.pictureUrl && <img alt="example" src={l.pictureUrl} />}
          >
            <Link to={`/matches/${l.id}`}>
              <Meta title={l.name} description={l.user.email} />
            </Link>
          </Card>
        ))}
      </div>
    );
  }
}

export const FindmatchesConnector = withFindmatches(C);
