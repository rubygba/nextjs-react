"use client"

import { useState } from 'react'

const allDeps: Array<any[][] | undefined> = []
let cursor: number = 0

function useEffect (callback: () => void, curDep?: any[]) {
  if (!curDep) {
    callback()
    allDeps[cursor] = undefined
    cursor++
    return
  }

  const preDep = allDeps[cursor]
  const hasChanged = preDep ? curDep.some((el, i) => el !== preDep[i]) : true
  
  if (hasChanged) {
    callback()
    allDeps[cursor] = curDep
  }

  cursor++
}

function Counter () {
  const [count, setCount] = useState(0)
  const [name, setName] = useState(2)

  const handleClick = () => {
    setCount(count + 0)
  }

  // my effect init
  cursor = 0

  useEffect(() => {
    console.log('effect 触发', name)
  }, [name])

  useEffect(() => {
    console.log('effect 触发', count)
  }, [count])

  return (
    <div style={{fontSize: 20}}>
      <div>{name}</div>
      <button onClick={() => {setName(name + Math.random())}}>点击+随机</button>
      <div>{count}</div>
      <button onClick={handleClick}>点击+1</button>
    </div>
  )
}

export default function MyHooks() {
  return (
    <div>
      <Counter />
    </div>
  )
}