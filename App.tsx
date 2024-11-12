import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Calculator from './src/screens/Calculator'
import CalculatorMain from './src/screens/CalculatorMain'

const App = () => {
  return (
    <SafeAreaView>
      <CalculatorMain/>
    </SafeAreaView>
  )
}

export default App