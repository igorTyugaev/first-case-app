import React from "react";

import ReactDOM from "react-dom";

import AccountTab from "./OrderEdit";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <AccountTab
      dialogProps={{
        open: true,

        onClose: () => {},
      }}
      user={{
        metadata: {
          lastSignInTime: 0,
        },
      }}
      userData={{}}
      openSnackbar={() => {}}
      onDeleteAccountClick={() => {}}
    />,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
