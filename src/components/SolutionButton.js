import React from "react";
import _ from "lodash";
import Button from "./Button";

class SolutionButton extends React.Component {
  state = {
    solutionNum: this.props.solve(this.props.board).length,
    text: "",
    display: false,
  };

  onButtonClick = () => {
    this.setState({
      display: !this.state.display,
      text: this.updateText(this.state.solutionNum),
    });
  };

  updateText = (solutionNum) => {
    if (solutionNum === 0) return "This board does not have a solution";
    else if (solutionNum === 1) return "This board has 1 solution";
    else if (solutionNum > 600) return "This board has more than 600 solutions";
    else return `This board has ${solutionNum} solution(s)`;
  };

  componentDidMount() {
    this.setState({ text: this.updateText(this.state.solutionNum) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.board, this.props.board)) {
      this.setState({
        solutionNum: this.props.solve(this.props.board).length,
        display: false,
      });
    }
  }

  renderText = () => {
    if (this.state.display) {
      return (
        <div className="ui pointing label">
          <p>{this.state.text}</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="solutionButton">
        <Button onButtonClick={this.onButtonClick} text="Show # of Solutions" />
        {this.renderText()}
      </div>
    );
  }
}

export default SolutionButton;
