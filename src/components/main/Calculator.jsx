import React, { Component } from 'react'
import './Calculator.css'
import Button from '../buttons/Button'
import Display from '../display/Display'

const init = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...init }

    constructor(props) {
        super(props)
        this.clearDisplay = this.clearDisplay.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.addOperation = this.addOperation.bind(this)
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" clickEvent={this.clearDisplay} triple />
                <Button label="/" clickEvent={this.addOperation} operation />
                <Button label="7" clickEvent={this.addDigit} />
                <Button label="8" clickEvent={this.addDigit} />
                <Button label="9" clickEvent={this.addDigit} />
                <Button label="*" clickEvent={this.addOperation} operation />
                <Button label="4" clickEvent={this.addDigit} />
                <Button label="5" clickEvent={this.addDigit} />
                <Button label="6" clickEvent={this.addDigit} />
                <Button label="-" clickEvent={this.addOperation} operation />
                <Button label="1" clickEvent={this.addDigit} />
                <Button label="2" clickEvent={this.addDigit} />
                <Button label="3" clickEvent={this.addDigit} />
                <Button label="+" clickEvent={this.addOperation} operation />
                <Button label="0" clickEvent={this.addDigit} double />
                <Button label="." clickEvent={this.addDigit} />
                <Button label="=" clickEvent={this.addOperation} operation />
            </div>
        )
    }

    clearDisplay() {
        this.setState({ ...init })
    }

    addDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit

        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const i = this.state.current
            const newValeu = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValeu
            this.setState({ values })
        }
    }

    addOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const isEquals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                values[1] = 0
            } catch (ex) {
                console.log(ex)
                values[0] = this.state.values[0]
            }
            
            this.setState({
                displayValue: values[0],
                operation: isEquals ? null : operation,
                current: isEquals ? 0 : 1,
                clearDisplay: !isEquals,
                values
            })
        }
    }
}

