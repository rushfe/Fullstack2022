import { useState } from 'react'

const Statisticline = (props) =>{
  return (
    <tr>
      <th>{props.text}</th>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good=props.good
  const neutral=props.neutral
  const bad=props.bad
  console.log(good)
  const average = () => {
    return (good-bad)/(good+neutral+bad)
  }
  const positive = () => {
    return (good/(good+neutral+bad))*100+"%"
  }

  if(good===0&&neutral===0&&bad===0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statisticline text="good" value={good} />
        <Statisticline text="neutral" value={neutral} />
        <Statisticline text="bad" value={bad} />
        <Statisticline text="all" value={good+neutral+bad} />
        <Statisticline text="average" value={average()} />
        <Statisticline text="positive" value={positive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerGoodClick = () => {
    setGood(good + 1)
  }
  const handlerNeClick = () => {
    setNeutral(neutral + 1)
  }
  const handlerBadClick = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handlerGoodClick}>good</button>
      <button onClick={handlerNeClick}>neutral</button>
      <button onClick={handlerBadClick}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



export default App