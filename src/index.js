import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressValue: 0,
      maxProgressValue: "x",
      popupNumber: 0,
      buttonValue: "Change Settings"
    };
    this.setMaxValue = this.setMaxValue.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.stop = this.stop.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.changeMaxValue = this.changeMaxValue.bind(this);
    this.getMaxProgressValue = this.getMaxProgressValue.bind(this);
    this.getProgressValue = this.getProgressValue.bind(this);
    this.changeProgressValue = this.changeProgressValue.bind(this);
    this.findPercentage = this.findPercentage.bind(this);
  }
  // Throwing errors
  throwError(errorString) {
    if (window.confirm(errorString)) return true;
    else {
      throw new Error(errorString);
    }
  }

  maxProgressAlgorithm() {
    var maxProgress = document.getElementById("max-progress").value;
    if (!isNaN(maxProgress)) {
      if (parseInt(maxProgress, 10) > 1) {
        if (maxProgress < 50) {
          this.setState({
            maxProgressValue: parseInt(maxProgress, 10)
          });
          // maxProgress = "";
        } else {
          //  document.getElementById(idstring).value = "";
          if (this.throwError("Maximum progress value >= 50")) return;
        }
      } else {
        //     document.getElementById(idstring).value = "";
        if (this.throwError("Maximum progress value <= 1")) return;
        else {
          if (this.throwError("Maximum progress value must be number")) return;
        }
      }
    } else {
      //  document.getElementById(idstring).value = "";
      if (this.throwError("Maximum progress value must be number")) return;
    }
  }
  setMaxValue(event) {
    event.preventDefault();
    if (this.state.maxProgressValue === "x") {
      var maxProgress = document.getElementById("max-progress").value;
      this.maxProgressAlgorithm(maxProgress, "max-progress");
    } else {
      document.getElementById("max-progress").value = "";
      if (this.throwError("Maximum progress value must be number")) return;
    }
  }
  increase() {
    if (this.state.maxProgressValue !== "x") {
      if (this.state.progressValue < this.state.maxProgressValue) {
        this.setState((state) => ({ progressValue: state.progressValue + 1 }));
      } else {
        this.setState({ progressValue: 0, maxProgressValue: "x" });

        if (this.throwError("Progress Value > maximum progress value")) return;
      }
    } else {
      if (this.throwError("Maximum progress value not set yet")) return;
    }
  }
  decrease() {
    if (this.state.maxProgressValue !== "x") {
      if (this.state.progressValue > 0) {
        this.setState((state) => ({ progressValue: state.progressValue - 1 }));
      } else {
        this.setState({ maxProgressValue: "x" });
        if (this.throwError("Progress Value < 0")) return;
      }
    } else {
      if (this.throwError("Maximum progress value not set yet")) return;
    }
  }
  stop() {
    if (this.state.maxProgressValue !== "x") {
      this.setState({
        progressValue: 0,
        maxProgressValue: "x"
      });
    } else {
      if (this.throwError("Already cleared")) return;
    }
  }
  changeSettings() {
    if (this.state.popupNumber % 2 === 0) {
      document.getElementById("popup").style.display = "block";
      this.setState({ buttonValue: "Close Settings" });
    } else if (this.state.popupNumber % 2 === 1) {
      document.getElementById("popup").style.display = "none";
      this.setState({ buttonValue: "Change Settings" });
    }
    this.setState((state) => ({ popupNumber: state.popupNumber + 1 }));
  }
  changeMaxValue(event) {
    event.preventDefault();
    if (this.state.maxProgressValue !== "x") {
      var maxProgress = document.getElementById("max-progress-2").value;

      if (parseInt(maxProgress, 10) === this.state.maxProgressValue) {
        document.getElementById("popup").style.display = "none";
        this.setState({ buttonValue: "Change Settings" });
        this.setState((state) => ({ popupNumber: state.popupNumber + 1 }));
        document.getElementById("max-progress-2").value = "";

        if (this.throwError("Max Progress Value already set to value")) return;
      }

      if (maxProgress !== "") {
        if (this.state.progressValue !== 0) {
          if (parseInt(maxProgress, 10) < this.state.progressValue) {
            this.setState({ progressValue: 0 });
          } else {
            if (
              window.confirm("Do you want to set the progress value to zero?")
            ) {
              this.setState({ progressValue: 0 });
            }
          }
        }
      } else {
        document.getElementById("popup").style.display = "none";
        this.setState({ buttonValue: "Change Settings" });
        this.setState((state) => ({ popupNumer: state.popupNumber + 1 }));
        document.getElementById("max-progress-2").value = "";
      }
      this.maxProgressAlgorithm(maxProgress, "max-progress-2");
    } else {
      document.getElementById("popup").style.display = "none";
      this.setState({ buttonValue: "Change Settings" });
      this.setState((state) => ({ popupNumber: state.popupNumber + 1 }));
      document.getElementById("max-progress-2").value = "";

      if (this.throwError("Maximum progress value not set yet")) return;
    }
    // console.log(<Header />);
  }
  getMaxProgressValue() {
    if (this.state.maxProgressValue === "x") return <b>Not set yet</b>;
    else return <b>{this.state.maxProgressValue}</b>;
  }
  getProgressValue() {
    if (this.state.maxProgressValue === "x") return <b>---</b>;
    else return <b>{this.state.progressValue}</b>;
  }
  changeProgressValue(event) {
    event.preventDefault();
    if (this.maxProgressValue === "x") {
      document.getElementById("progress").value = "";
      if (this.throwError("Maximum value not set yet")) return;
    } else {
      if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue
      ) {
        document.getElementById("progress").value = "";
        if (this.throwError("Max Progress Value already set to value")) return;
      } else if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue + 1
      ) {
        document.getElementById("progress").value = "";
        if (this.throwError("New progress value is incremental")) return;
      } else if (
        parseInt(document.getElementById("progress").value, 10) ===
        this.state.progressValue - 1
      ) {
        document.getElementById("progress").value = "";
        if (this.throwError("New progress value is decremental")) return;
      } else {
        if (
          parseInt(document.getElementById("progress").value, 10) >
          this.maxProgressValue
        ) {
          document.getElementById("progress").value = "";
          if (this.throwError("Progress Value > maximum progress value"))
            return;
        } else {
          this.setState({
            progressValue: parseInt(
              document.getElementById("progress").value,
              10
            )
          });
          document.getElementById("progress").value = "";
        }
      }
    }
  }
  findPercentage() {
    var percentage =
      Math.round(
        1000 * (this.state.progressValue / this.state.maxProgressValue)
      ) / 10;

    if (this.state.maxProgressValue !== "x") {
      if (percentage <= 25) {
        return (
          <span className="percentage-bar percentage-bar-red">
            ({percentage}%)
          </span>
        );
      } else if (percentage > 25 && percentage <= 50) {
        return (
          <span className="percentage-bar percentage-bar-orange">
            ({percentage}%)
          </span>
        );
      } else if (percentage > 50 && percentage <= 75) {
        return (
          <span className="percentage-bar percentage-bar-yellow">
            ({percentage}%)
          </span>
        );
      } else {
        return (
          <span className="percentage-bar percentage-bar-green">
            ({percentage}%)
          </span>
        );
      }
    } else {
      return <span />;
    }
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: "350px" }} />
        <div id="navbar-form">
          <div id="progress-form">
            <form onSubmit={this.setMaxValue} autoComplete="off">
              <label htmlFor="max-progress">Enter the total task value: </label>
              <input type="text" id="max-progress" />
              <button type="submit" id="enter-button">
                Enter!
              </button>
            </form>
            <br />
            <div className="border-div">
              <div className="progress-bar-form">
                <button
                  className="progress-button normal-button"
                  onClick={this.decrease}
                >
                  -
                </button>
                <progress
                  id="progress-bar"
                  value={this.state.progressValue}
                  max={this.state.maxProgressValue}
                />
                <button
                  className="progress-button normal-button"
                  onClick={this.increase}
                >
                  +
                </button>
                <p className="progress-value">
                  {this.state.progressValue} out of{" "}
                  <span className="max-progress-value">
                    {this.state.maxProgressValue}
                  </span>{" "}
                  {this.findPercentage()} tasks complete
                </p>
              </div>

              <button className="cancel-button" onClick={this.stop}>
                Stop/Cancel
              </button>
            </div>
            <button
              className="change-settings normal-button"
              onClick={this.changeSettings}
            >
              {this.state.buttonValue}
            </button>
            <div id="popup">
              <form autoComplete="off">
                <label>
                  Total tasks: {this.getMaxProgressValue()}, progress value:{" "}
                  {this.getProgressValue()}
                </label>
                <br />
                <input id="max-progress-2" />
                <button
                  className="normal-button wide"
                  onClick={this.changeMaxValue}
                >
                  Change total tasks
                </button>
                <br />
                <input id="progress" />
                <button
                  className="normal-button wide"
                  onClick={this.changeProgressValue}
                >
                  Change completed tasks
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
