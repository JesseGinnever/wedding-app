import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ContentSection from './Components/ContentSection';

export default () => (
<BrowserRouter>
    <Switch>
        <Route path="/" component={ContentSection} />
    </Switch>
</BrowserRouter>
);