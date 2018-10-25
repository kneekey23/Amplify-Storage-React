import React, { Component } from 'react';
import './logo.svg';
import './App.css';
import aws_exports from './aws-exports';
import { withAuthenticator, S3Album } from 'aws-amplify-react';
import Amplify, { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react/dist/Storage';




Amplify.configure(aws_exports);
Storage.configure({ level: 'private' });

class App extends Component {

  constructor(props,context) {
    super(props, context);
    this.state = {
        file: ''
    };
    this.uploadFile = this.uploadFile.bind(this);
 
}

  uploadFile = (evt) => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    })
  }


  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <input type="file" onChange={this.uploadFile} />
        <S3Album level="private" path='' />
       
      </div>
    );
  }
}

export default withAuthenticator(App, true);
