import * as React from 'react';

import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';

import StepLabel from '@material-ui/core/StepLabel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';

import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import Card from '@material-ui/core/Card';

import { Clipboard } from 'ts-clipboard';

@observer
export class CreateChain extends React.Component {
    @observable public description: string;
    @observable private activeStep=0;
    @observable private skipped = new Set<number>();
    @observable private url: string;
    @observable private tag: string;
    @observable private tags =  [] as string[];
    @observable private chainId: string | undefined = undefined;

    @observable private result: any;

    public render() {
        return (
            <div className="create-chain">
                <Stepper activeStep={this.activeStep} className="create-chain-steper">
                    {this.steps.map((label, index) => {
                        const props = {} as {completed: boolean};
                        const labelProps = {} as {optional: any};
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className="create-chain-content">
                    {this.finished ? (this.renderResult()) : (
                            <div>
                                {this.getStepContent(this.activeStep)}
                                <div className="create-chain-buttons">
                                    <Button
                                        disabled={this.activeStep === 0}
                                        onClick={this.handleBack}
                                    >
                                        Back
                                    </Button>
                                    {this.isStepOptional(this.activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSkip}
				            disabled={this.activeStep === 2}

                                        >
                                          Skip 
                                        </Button>
                                    )} 
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        disabled={!!!this.url}
                                    >
                                        {this.activeStep === this.steps.length - 1 ? 'Create Entry' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}

                </div>

		{!!this.result && <Card className="retrieve-card-result">
                        <img
                            src={this.result}
                        />
                </Card>}


            </div>
        );
    }

    @action
    public async createEntry() {

        let aurl = this.url;
        if (aurl.substring(0,4) !== "http")
        {    aurl ="http://"+aurl ;}

       // const response = await axios.get(`http://tokens.weku.io:7000/new?url=${this.url}&tags=${this.tags}`);
       const response = await axios.get(`https://webshot.weku.io:7000/new?url=${aurl}&tags=${this.tags}`);
       this.chainId = aurl; // response.data;
       
       this.result = "https://webshot.weku.io/"+response.data+".png";
    }

    private renaderUrlTextField = () => {
        return (
            <TextField
                label="URL"
                onChange={this.onUrlChange}
                placeholder="e.g. https://google.com"
                className="url-input"
                margin="normal"
        />);
    }

    private renderAddDescription = () => {
        return (
            <TextField
                className="description-input"
                label="Description"
                onChange={this.onDescriptionChange}
                placeholder="e.g. This Entry is about..."
                margin="normal"
            />
        );
    }

    private renderResult = () => {
        return ( 
            <div>
                {!this.chainId && <CircularProgress size={50} />}
                {this.chainId && 
                    <Card className="create-result-card">
                        <Button onClick={this.handleCopyResult}>{this.chainId}</Button>
                    </Card>
                }
            </div>
        )
    }

    private renderAddTags = () => {
        return (
            <div>
                <TextField
                    label="Tag"
                    value={this.tag}
                    onChange={this.onTagChange}
                    placeholder="e.g. Important"
                    margin="normal"
                />
                <Button 
                    color="primary"
                    onClick={this.onAddTag}>
                    Add
                </Button>
                {this.tags.map(tag => (<Chip onDelete={this.handleRemoveChip(tag)} label={tag} />))}
                
            </div>
        );
    }

    private isStepOptional = (step: number) => {
        return step === 1 || step === 2;
    }

    private isStepSkipped = (step: number) => {
        return this.skipped.has(step);
    }

    private getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return this.renaderUrlTextField();
            case 1:
                return this.renderAddTags();
            case 2:
                return this.renderAddDescription();
            default:
                return 'Unknown step';
        }
    }

    @computed
    get steps() {
        return ['Input Target URL', 'Add Tags', 'Add a Description'];
    }

    @computed
    get finished () {
        return this.activeStep === this.steps.length && this.url;
    }
    @action
    private handleNext = () => {
        if (this.isStepSkipped(this.activeStep)) {
          this.skipped = new Set(this.skipped.values());
          this.skipped.delete(this.activeStep);
        }
        this.activeStep ++;
        if (this.activeStep >= this.steps.length) {
            this.createEntry();
        }
    };
    @action
    private  handleBack = () => {
        this.activeStep --;
    };
    @action
    private handleSkip = () => {
        if (!this.isStepOptional(this.activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
        this.skipped = new Set(this.skipped.values());
        this.skipped.add(this.activeStep);
        this.activeStep ++;
    };

    @action
    private onUrlChange = (event: any) => {
        
        this.url = event.target.value;
     
    }

    @action
    private onDescriptionChange = (event: any) => {
        this.description = event.target.value;
    }

    @action
    private onAddTag = () => {
        if (this.tag) {
            this.tags.push(`${this.tag}`);
        }
    }

    @action
    private onTagChange = (event: any) => {
        this.tag = event.target.value;
    }

    @action
    private removeTag = (tag: string) => {
        this.tags = this.tags.filter(t => t !== tag);
    }

    private handleRemoveChip = (tag: string) => () => {
        this.removeTag(tag);
    }

    @action
    private handleCopyResult = () => {
        const chainId = `${this.chainId}`;
        Clipboard.copy(chainId);
    }
}
