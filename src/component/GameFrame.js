import React, { Component } from 'react'

import './GameFrame.css';
import { getIndexOfElement, getSiblings, findItem, moveItems } from '../utils/Utils';
import BlunkDiv from './BlunkDiv';


import { chunk, includes, shuffle, } from 'lodash';
// import _ from 'lodash';
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

        const isblukSibling = includes(siblings.map(e => JSON.stringify(e)), JSON.stringify(blunkCoor));
        if (isblukSibling) {
            moveItems(elements, coord, blunkCoor);

            this.setState((oldState, oldProps) => {
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
                    jsxElements.push(<BlunkDiv key={item} onClick={this.moveElement} >{item}</BlunkDiv>);
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
                    <div>Win !!!! with move count {this.state.moveCount}</div>
                    <button onClick={this.startAgain}>Start again</button>
                </div>
            )
        } else {
            let jsxElements = this.getDivsFromArray();
            return (
                <div>
                    <button onClick={this.startAgain}>Refresh</button>
                    <div>Count of Moves  {this.state.moveCount}</div>
                    <div className="mainFrame">
                        {jsxElements}
                    </div>
                </div>
            )
        }
    }
}
