import React, { Component } from 'react'
import Light from './Light'
import uid from 'uid';

import './../css/board.css'
export default class GameBoard extends Component {
     initialArray=[
        [1,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]
    constructor(props){
        super(props)
        this.state={
            isGame:false,
            isPlaying: false,
            gameArray: [
                [1,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ]
        }
        this.click = this.click.bind(this)    
        this.toogle = this.toogle.bind(this)    
        this.startPlay = this.startPlay.bind(this)    
    }
    toogle(row,col,gameArray){
        console.log(`row = ${row} col= ${col} gameArray = ${gameArray[row][col]}`)
        gameArray[row][col]=gameArray[row][col]?0:1
        if(col+1<5)        
            gameArray[row][col+1]=gameArray[row][col+1]?0:1
        if(row+1<5)
            gameArray[row+1][col]=gameArray[row+1][col]?0:1
        if(row-1>-1)
            gameArray[row-1][col]=gameArray[row-1][col]?0:1
        if(col-1>-1)
            gameArray[row][col-1]=gameArray[row][col-1]?0:1 

        
        return gameArray
    }
    click(row,col){
        if(this.state.isPlaying){
            let newArray = this.toogle(row,col,this.state.gameArray)
            this.setState({...this.state,gameArray: newArray})  
            let game = 0
            this.state.gameArray.map(row=>{
                row.map(item=>{
                    game = item || game
                })
            })
            if(game===0){
                this.setState({...this.state,isGame:true,isPlaying:false})
            }
        }


    }
    startPlay(){
        if(!this.state.isPlaying)
            this.setState({...this.state,isPlaying:true})
        if(this.state.isGame)
            this.setState({...this.state,gameArray:this.initialArray ,isGame:false})
    }
    render() {
        let rows = this.state.gameArray.map(item=>item)
        return (
            <div className="container">
                {this.state.isGame?<h1>You Won!</h1>:<h1>!Light It Up</h1>}
                    {   
                        rows.map((block,rowIndex)=>
                            <div className="item flex-item" key={uid()}>
                                {
                                    block.map((item,colIndex)=>
                                    <Light itemVaule={item} key={uid()} colIndex={colIndex} rowIndex={rowIndex} clickHandle={this.click} ></Light>)
                                }
                            </div>)
                    }
                    <button className={`btn-play ${this.state.isPlaying?" btn-hidden":" "}`} onClick={this.startPlay}>{ this.state.isGame?"Replay":"Play"}</button>
            </div>
        )
    }
}
