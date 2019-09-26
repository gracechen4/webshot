import AppBar from 'material-ui/AppBar';
import * as React from 'react';

export class Header extends React.Component {
    public render() {
        return (
            <AppBar
                title="WEKU Webshot - Take screenshot of webpage and publish to WEKU Blockchain."
                iconClassNameRight="muidocs-icon-navigation-expand-more"

            />
        );
    }
}
