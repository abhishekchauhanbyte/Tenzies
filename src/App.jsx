import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  
  const [tenzies , setTenzies] = React.useState(false)

  const [rolls , setRolls] = React.useState(0)

  const [bestScore , setBestScore] = React.useState(localStorage.getItem("bestScore") || -1)

  React.useEffect(()=>{
    const commonValue = dice[0].dieValue
    const allHeld = dice.every(die => die.isHeld)
    const allValueSame = dice.every(die => die.dieValue === commonValue)
    if(allHeld && allValueSame) {
      setTenzies(true)
    }
    
  } , [dice])


  function allNewDice() {
      const newDice = []

      //Assuming 10 dices in the window by default.
      for (let i = 0; i < 10; i++) {
          let randomValue = Math.ceil(Math.random() * 6)
          newDice.push({dieValue : randomValue ,isHeld: false , id : nanoid() })
      }
      return newDice
  }

  function newValueOfDice(){
    return Math.ceil(Math.random () * 6)
  }


  function rollDice() {
        if(tenzies){
        setBestScore(oldScore =>{
          const newScore = (oldScore<rolls && oldScore!==-1) ? oldScore : rolls
          localStorage.setItem("bestScore" , newScore) 
          return newScore})
        setDice(oldDice => allNewDice())
        setTenzies(false) 
        setRolls(0)
      }
      else{
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : {
          ...die,
          dieValue : newValueOfDice()
        }

      }))
      setRolls(oldRolls => oldRolls + 1)
    }
  }
  
  function holdDice(currId) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === currId ? {
          ...die,
          isHeld: !die.isHeld 
        } : {...die}
      }))
  }
  const diceElements = dice.map(die => <Die key = {die.id} 
                                id = {die.id}
                                value={die.dieValue} 
                                isHeld={die.isHeld} 
                                holdDice={holdDice} />)
  
  return (
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <h2>{`Number of rolls : ${rolls}`}</h2>
          {bestScore === -1 ? "" : <h3>{ `Best Score : ${bestScore}`}</h3> }
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>{tenzies ? "Reset game" : "Roll"}</button>
      </main>
  )
}