import * as React from "react";

import {
  FindMatche,
  WithFindMatche,
  DeslikeController
} from "@tinder/controller";

import { Button } from "antd";

export class FindmatchesConnector extends React.PureComponent<WithFindMatche> {
  render() {
    return (
      <div>
        <FindMatche>
          {data => {
            console.log(data.matches);
            return (
              <DeslikeController>
                {({ desLike }) => (
                  <div>
                    <Button
                      onClick={async () => {
                        await desLike({
                          variables: {
                            matcheId: "61e32fe3-9d65-456b-9632-2c476f41be7a"
                          }
                        });
                        console.log(data);
                      }}
                    >
                      gffgf
                    </Button>
                  </div>
                )}
              </DeslikeController>
            );
          }}
        </FindMatche>
      </div>
    );
  }
}
