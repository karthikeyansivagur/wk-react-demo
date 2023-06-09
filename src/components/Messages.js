import React from 'react';

import Message from './Message';

import {
  Link,
  Route,
  Switch
} from 'react-router-dom';

const Messages = ({ match }) => (
  <div>
    <ul>
    {
        [...Array(5).keys()].map(n => {
          const strUrl = `str:${n+1}`;
            return <li key={n}>
                    <Link to={`${match.url}/${strUrl}`}>
                      Message {n+1}
                    </Link>
                  </li>;
        })
    }
    </ul>
    <Switch>
      <Route path={`${match.url}/:id`} component={Message} />
      <Route
        path={match.url}
        render={() => <h3>Please select a message</h3>}
      />
    </Switch>
  </div>
);

export default Messages;