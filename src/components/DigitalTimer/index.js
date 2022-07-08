// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStarted: false, minutes: 25, newMinute: 25, seconds: 0}

  OnStart = () => {
    this.setState(prevState => {
      const {isStarted} = prevState
      return {
        isStarted: !isStarted,
      }
    })
  }

  onDecrement = () => {
    const {isStarted, minutes} = this.state
    if (!isStarted) {
      if (minutes > 1) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          newMinute: prevState.newMinute - 1,
        }))
      }
    }
  }

  onIncrement = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        newMinute: prevState.newMinute + 1,
      }))
    }
  }

  timerChange = () => {
    const {newMinute, seconds} = this.state
    if (newMinute === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newMinute * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({newMinute: m, seconds: s})
    }
  }

  OnStart = () => {
    this.setState({isStarted: true})
    this.timerId = setInterval(this.timerChange, 1000)
  }

  onStop = () => {
    this.setState({isStarted: false})
    clearInterval(this.timerId)
  }

  onReset = () => {
    this.setState({isStarted: false, minutes: 25, newMinute: 25, seconds: 0})
    clearInterval(this.timerId)
  }

  render() {
    const {isStarted, minutes, seconds} = this.state
    const {newMinute} = this.state

    const runTime =
      seconds > 9 ? `${newMinute}:${seconds}` : `${newMinute}:0${seconds}`

    return (
      <div className="main-div">
        <h1 className="mainH1">Digital Timer</h1>
        <div className="nextDiv">
          <div className="leftDiv">
            <div className="timeDiv">
              <h1 className="timer">{runTime}</h1>
              <p className="timerP">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="rightDiv">
            <div className="rightTopDiv">
              <button
                type="button"
                onClick={isStarted ? this.onStop : this.OnStart}
                className="btn"
              >
                {isStarted ? (
                  <img
                    alt="pause icon"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    className="playImg"
                  />
                ) : (
                  <img
                    alt="play icon"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    className="playImg"
                  />
                )}
                <p className="playText">{isStarted ? 'Pause' : 'Start'}</p>
              </button>
              <button type="button" onClick={this.onReset} className="btn">
                <img
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="playImg"
                />
                <p className="playText">Reset</p>
              </button>
            </div>
            <div className="rightBotDiv">
              <p className="setTimer">Set Timer limit</p>
              <div className="setTimerDiv">
                <div className="setSymbDiv">
                  <button
                    type="button"
                    onClick={this.onDecrement}
                    className="symb"
                  >
                    -
                  </button>
                  <p className="setTimerItem"> {minutes} </p>
                  <button
                    type="button"
                    onClick={this.onIncrement}
                    className="symb"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
