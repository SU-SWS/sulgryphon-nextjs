import React, {Component, createRef, RefObject} from 'react';
import {DrupalParagraph} from "next-drupal";
import {ArrowPathIcon} from "@heroicons/react/20/solid";

import {drupal} from "@/lib/drupal";
import {Paragraph} from "@/components/paragraphs";

interface PreviewProps {

}

interface PreviewState {
  iframeId: string
  paragraphData?: DrupalParagraph
}

export default class ParagraphPreview extends Component<PreviewProps, PreviewState> {

  private readonly componentRef: RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      iframeId: null,
      paragraphData: null
    }
    this.componentRef = createRef();
    this.setParagraphData = this.setParagraphData.bind(this);
    this.emitComponentHeight = this.emitComponentHeight.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  setParagraphData({data}) {
    try {
      const jsonData = JSON.parse(data);
      this.setState({paragraphData: drupal.deserialize(jsonData) as DrupalParagraph})
    } catch (e) {
      this.setState({iframeId: data})
    }
  }

  emitComponentHeight() {
    if (this.state.iframeId && this.state.paragraphData) {
      const message = JSON.stringify({id: this.state.iframeId, height: this.componentRef.current?.clientHeight})
      window.parent.postMessage(message, '*');
    }
  }

  checkData() {
    if (this.state.iframeId && this.state.paragraphData) {
      return;
    }
    const message = JSON.stringify({message: 'refresh'})
    window.parent.postMessage(message, '*');

    setTimeout(this.checkData, 1000);
  }

  componentDidMount() {
    window.addEventListener('message', this.setParagraphData);
    window.addEventListener('resize', this.emitComponentHeight)

    setTimeout(this.checkData, 1000);
  }

  componentDidUpdate() {
    this.emitComponentHeight();
    setTimeout(this.emitComponentHeight, 1000);
  }

  render() {
    return (
      <div ref={this.componentRef} className="su-p-30">
        {!this.state.paragraphData &&
            <div className="su-text-center">
              <ArrowPathIcon className="su-mx-auto su-animate-spin" width={30} height={30}/>
              Loading...
            </div>
        }

        {this.state.paragraphData && <Paragraph paragraph={this.state.paragraphData}/>}
      </div>
    )
  }

}
