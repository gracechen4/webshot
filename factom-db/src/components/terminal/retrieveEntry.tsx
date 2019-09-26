import * as React from 'react';

import { action, observable } from 'mobx';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';

import axios from 'axios';

import { observer } from 'mobx-react';
@observer
export class RetrieveEntry extends React.Component {
    @observable private chainId: string;
    @observable private result: any;

    public render() {
        return (
            <div className="retrieve-entry">
                <Card className="retrieve-card">
                    <div>
                        <TextField
                            className="chain-id-input"
                            label="Webshot ID"
                            onChange={this.onChainIdChange}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={this.handleRetrieve}>Retrieve By Weshot ID</Button>
                    </div>
                </Card>
                {!!this.result && <Card className="retrieve-card-result">
                        <img
                            src={this.result}
                        />
                </Card>}
            </div>
        );
    }

    @action
    public async retrieveEntry() {
        const response = await axios.get(`https://webshot.weku.io:7000/get?chainId=${this.chainId}`);
        this.result = response.data;
        
        alert("ssssssssssss");
	
    }

    @action
    private handleRetrieve = () => {
        this.retrieveEntry();
    }

    @action
    private onChainIdChange = (event: any) => {
        this.chainId = event.target.value;
    }
}
