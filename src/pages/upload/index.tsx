import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import api from '../../common/api';
import { gqlApi } from '../../common/gql';
import { actions, IActions } from '../../store/videos';

interface IUploadState {
  file: File | null;
  title?: string;
  description?: string;
  submitInProgress: boolean;
}

const defaultState = {
  file: null,
  title: '',
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
    this.setState({ file });
  }

  submitFile = async () => {
    const { file, title, description } = this.state;

    try {
      const filename = await api.uploadFile(file as File);
      console.log(`file ${filename} uploaded`);
      const video = await gqlApi.addVideo(title as string, filename, description);
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

      <Form.Group controlId='file'>
        <Form.Label>File upload</Form.Label>
        <Form.Control type='text' placeholder='title' value={this.state.title} onChange={(e: any) => { this.setState({ title: e.target.value }) }} />
        <Form.Control type='text' placeholder='description' value={this.state.description} onChange={(e: any) => { this.setState({ description: e.target.value }) }} />
        <Form.Control type='file' accept='image/*' ref={this.fileInputRef} onChange={(e: any) => this.onFileSelected(e.target.files)} />
        <Button variant='primary' type='submit' disabled={!file || submitInProgress}>Submit</Button>
        <Button onClick={this.resetForm}>Reset</Button>
      </Form.Group>

    </Form>
  }

}

export default connect(undefined, actions)(Upload);
