import React, { Component } from 'react'
import './GameFrame.css';
import { getIndexOfElement, getSiblings, moveItems } from '../utils/Utils';
import { chunk, shuffle, } from 'lodash';

export default class GameFrame extends Component {


    static BLUNK = '';
    static INITIAL_ARRAY = [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, GameFrame.BLUNK, 15];

    static WIN_ARRAY = [ 
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, GameFrame.BLUNK]
    ];

    constructor(props) {
        super(props);
        const elements = chunk(GameFrame.INITIAL_ARRAY, 4);
        this.state = {
            elem: elements,
            win: false,
            moveCount: 0
        };
    }

    moveElement = (e) => {
        let clickedItemValue = e.target.innerHTML;
        const elements = this.state.elem;
        let coord = getIndexOfElement(elements, clickedItemValue);
        let blunkCoor = getIndexOfElement(elements, GameFrame.BLUNK);
        const siblings = getSiblings(elements, coord.x, coord.y);

        const isblukSibling = siblings.map(e => JSON.stringify(e)).includes(JSON.stringify(blunkCoor));
        if (isblukSibling) {
            moveItems(elements, coord, blunkCoor);
            this.setState((oldState) => {
                return {
                    elem: elements,
                    moveCount: oldState.moveCount + 1
                }
            });
            this.checkWinCondition();
        }
    }

    checkWinCondition = () => {
        let w = JSON.stringify(this.state.elem) === JSON.stringify(GameFrame.WIN_ARRAY);
        this.setState({
            win: w
        })

    }
    startAgain = () => {
        const shuffledArray = shuffle(GameFrame.INITIAL_ARRAY);
        const elements = chunk(shuffledArray, 4);

        this.setState({
            win: false,
            elem: elements,
            moveCount: 0
        });
    }

    getDivsFromArray() {
        const jsxElements = [];
        for (let row of this.state.elem) {
            for (let item of row) {
                if (item === GameFrame.BLUNK) {
                    let emptyDiv = <div key={item} style={{
                        backgroundColor: '#84e19b'
                    }}></div>
                    jsxElements.push(emptyDiv);
                } else {
                    jsxElements.push(<div key={item} onClick={this.moveElement} >{item}</div>);
                }
            }
        }

        return jsxElements;
    }

    render() {
        if (this.state.win) {
            return (
                <div className="winFrame">
                    <div> Win !!!  Move count {this.state.moveCount}</div>
                    <button className="grnButton" onClick={this.startAgain}>Start again</button>
                </div>
            )
        } else {
            let jsxElements = this.getDivsFromArray();
            return (
                <div className="Refresh">
                    <button className="grnButton" onClick={this.startAgain}>Refresh</button>
                    <div> Count of Moves  {this.state.moveCount}</div>
                    <div className="mainFrame">
                        {jsxElements}
                    </div>
                </div>
            )
        }
    }
}
