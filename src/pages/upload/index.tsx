import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import api from '../../common/api';
import { gqlApi } from '../../common/gql';
import { actions, IActions } from '../../store/videos';

import './index.css';

interface IUploadState {
  file: File | null;
  title: string;
  filename: string;
  description?: string;
  submitInProgress: boolean;
}

const defaultState = {
  file: null,
  title: '',
  filename: '',
  description: '',
  submitInProgress: false,
};

class Upload extends React.Component<IActions, IUploadState> {
  private readonly fileInputRef: React.RefObject<any>;

  constructor(props: IActions) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = defaultState;
  }

  onFileSelected = (selectorFiles: FileList) => {
    const file = selectorFiles.item(0);
    let stateDiff: any = defaultState;

    if (file) {
      const { name } = file as any;
      const { filename, title } = this.state;

      stateDiff = {
        file,
        filename: filename || name,
        title: title || name,
      };
    }

    this.setState(stateDiff);
  }

  submitFile = async () => {
    const { file, title, filename, description } = this.state;

    try {
      const uploadPath = await api.uploadFile(file as File);
      console.log(`file ${uploadPath} uploaded`);
      const video = await gqlApi.addVideo(title, filename, uploadPath, description);
      console.log(video);
      this.props.videosAdd(video);
    } catch (ex) {
      console.log('submit file failed');
      console.log(ex);
    }
  }

  onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.setState(
      { submitInProgress: true },
      () => this.submitFile().finally(this.resetForm)
    );
  }

  resetForm = () => {
    (this.fileInputRef.current as any).value = '';
    this.setState(defaultState);
  }

  public render() {
    const { file, submitInProgress } = this.state;

    return <Form onSubmit={this.onFormSubmit} >
      <h1>File upload</h1>

      <Form.Group controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' placeholder='title' value={this.state.title} onChange={(e: any) => { this.setState({ title: e.target.value }) }} />
      </Form.Group>

      <Form.Group controlId='filename'>
        <Form.Label>Filename</Form.Label>
        <Form.Control type='text' placeholder='filename' value={this.state.filename} onChange={(e: any) => { this.setState({ filename: e.target.value }) }} />
      </Form.Group>

      <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' placeholder='description' value={this.state.description} onChange={(e: any) => { this.setState({ description: e.target.value }) }} />
      </Form.Group>

      <Form.Group controlId='file'>
        <Form.Control type='file' accept='video/*' ref={this.fileInputRef} onChange={(e: any) => this.onFileSelected(e.target.files)} />
      </Form.Group>

      <Button variant='primary' type='submit' disabled={!file || submitInProgress}>Submit</Button>
        &nbsp;
        <Button onClick={this.resetForm}>Reset</Button>

    </Form>
  }

}

export default connect(undefined, actions)(Upload);
