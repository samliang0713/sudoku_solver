import React from "react";
import Button from "./Button";

class ImportButton extends React.Component {
  state = { display: false };

  onButtonClick = () => {
    this.setState({ display: !this.state.display });
  };

  renderForm = () => {
    if (this.state.display) {
      return (
        <div className="ui pointing label">
          <form onSubmit={this.props.onFormSubmit}>
            <div>
              <input
                type="text"
                inputMode="numeric"
                id="importNumString"
                value={this.props.numString}
                placeholder="Enter a 81-digit string"
                onChange={(e) => this.props.updateNumString(e)}
              ></input>
              <div>
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="importButton">
        <Button onButtonClick={this.onButtonClick} text="Import Puzzle" />
        {this.renderForm()}
      </div>
    );
  }
}

export default ImportButton;
