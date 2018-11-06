import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContentSection from './Components/ContentSection';
import PhotoSlash from './Components/PhotoSlash';

export default () => (
<BrowserRouter>
    <Switch>
        <Route path="/" component={PhotoSlash} exact/>
        <Route path="/rsvp" component={ContentSection} />
    </Switch>
</BrowserRouter>
);