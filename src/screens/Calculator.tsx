import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Octicons from 'react-native-vector-icons/Octicons'
import StorageProvider from "../utils/StorageProvider";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const storageProvider = new StorageProvider('CALC');

  const handleInput = (value: string) => {
    if (value === "C") {
      setInput("0");
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };
  const handleCalculate = () => {
    try {
      storageProvider.saveData(input);
      const result = eval(input);
      setInput(Number.isFinite(result) ? result.toString() : "Error");
    } catch (error) {
      setInput("Error");
    }
  };
  const getHistory = async () => {
    const input = await storageProvider.getData();
    setInput(input ? input : '0');
  }

  const layout = [
    [
      { inputValue: "7", displayText: '7', style: styles.button, handler: handleInput },
      { inputValue: "8", displayText: '8', style: styles.button, handler: handleInput },
      { inputValue: "9", displayText: '9', style: styles.button, handler: handleInput },
      {
        inputValue: "/",
        displayText: "÷",
        style: styles.operatorButton,
        handler: handleInput,
      },
    ],
    [
      { inputValue: "4", displayText: '4', style: styles.button, handler: handleInput },
      { inputValue: "5", displayText: '5', style: styles.button, handler: handleInput },
      { inputValue: "6", displayText: '6', style: styles.button, handler: handleInput },
      {
        inputValue: "*",
        displayText: "×",
        style: styles.operatorButton,
        handler: handleInput,
      },
    ],
    [
      { inputValue: "1", displayText: '1', style: styles.button, handler: handleInput },
      { inputValue: "2", displayText: '2', style: styles.button, handler: handleInput },
      { inputValue: "3", displayText: '3', style: styles.button, handler: handleInput },
      { inputValue: "-", displayText: '-', style: styles.operatorButton, handler: handleInput },
    ],
    [
      { inputValue: "0", displayText: '0', style: styles.button, handler: handleInput },
      { inputValue: ".", displayText: '.', style: styles.button, handler: handleInput },
      { inputValue: "C", displayText: 'C', style: styles.button, handler: handleInput },
      { inputValue: "+", displayText: '+', style: styles.operatorButton, handler: handleInput },
    ],
    [
      {
        inputValue: "=",
        displayText: '=',
        style: styles.calculateButton,
        handler: handleCalculate,
      },
    ],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput multiline={false} style={styles.input} editable={false}>
          {input}
        </TextInput>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
          getHistory();
        }
        }>
          <Octicons name="history" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {layout.map((rows, index) => (
          <View style={styles.row} key={index}>
            {rows.map((row) => (
              <TouchableOpacity
                key={row.inputValue}
                style={row.style}
                onPress={() => row.handler(row.inputValue)}
              >
                <Text style={styles.buttonText}>
                  {row.displayText ? row.displayText : row.inputValue}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "space-around",
  },
  inputContainer: {
    height: 160,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#505050",
    flex: 1,
    padding: 16,
    borderRadius: 10,
    margin: 6,
  },
  input: {
    fontSize: 48,
    color: "#fff",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
  },
  operatorButton: {
    backgroundColor: "#ff0000",
    flex: 1,
    padding: 16,
    borderRadius: 10,
    margin: 6,
  },
  buttonText: {
    fontSize: 28,
    textAlign: "center",
    color: "#fff",
  },
  calculateButton: {
    backgroundColor: "#ff0000",
    borderRadius: 10,
    padding: 16,
    width: "100%",
  },
});
export default Calculator;