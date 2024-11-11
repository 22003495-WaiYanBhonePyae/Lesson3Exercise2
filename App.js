import React, { useState } from 'react';
import {View, Text, Button, Alert, Image, TouchableOpacity, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const QuizQuestion = ({ imageSource, question, selectedValue, onValueChange }) => {
  return (
      <ScrollView style={{ marginBottom: 20 }}>
        <Image source={imageSource} style={{ width: '100%', height: 150 }} />
        <Text>{question}</Text>
        <RNPickerSelect
            onValueChange={onValueChange}
            items={[
              { label: 'Elephant', value: 'Elephant' },
              { label: 'Leopard', value: 'Leopard' },
              { label: 'Kingfisher', value: 'Kingfisher' },
              { label: 'Owl', value: 'Owl' },
            ]}
            style={{
              inputIOS: { borderWidth: 1, padding: 10 },
              inputAndroid: { borderWidth: 1, padding: 10 }
            }}
            placeholder={{ label: "Select an item...", value: "" }}
            value={selectedValue}
        />
      </ScrollView>
  );
};

const QuizApp = () => {
  // State to track answers for each question
  const [answers, setAnswers] = useState(["", "", ""]);
  const correctAnswers = ["Elephant", "Leopard", "Kingfisher", "Owl"];

  // Images and questions for each quiz question
  const questions = [
    { source: require('./img/elephant.jpg'), label: "What animal is this?" },
    { source: require('./img/leopard.jpg'), label: "What animal is this?" },
    { source: require('./img/kingfisher.jpg'), label: "What animal is this?" },
    { source: require('./img/owl.jpg'), label: "What animal is this?" },
  ];

  // Function to update answers array when an answer is selected
  const updateAnswer = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Function to check answers and show result
  const submitAnswers = () => {
    let correctCount = 0;

    // Count correct answers
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    // Create feedback message based on score
    let message;
    if (correctCount === correctAnswers.length) {
      message = `Well done! You got all ${correctCount} answers correct!`;
    } else if (correctCount >= correctAnswers.length / 2) {
      message = `Good job! You got ${correctCount} out of ${correctAnswers.length} correct.`;
    } else if (correctCount > 0) {
      message = `Not bad! You got ${correctCount} correct. Try again for a higher score!`;
    } else {
      message = "Oops! Better luck next time. You got none correct.";
    }

    // Show the feedback in an alert
    Alert.alert(message);
  };


  return (
      <ScrollView style={{ padding: 20 }}>
        {/* Render each question using QuizQuestion component */}
        {questions.map((item, index) => (
            <QuizQuestion
                key={index}
                imageSource={item.source}
                question={item.label}
                selectedValue={answers[index]}
                onValueChange={(value) => updateAnswer(value, index)}
            />
        ))}
        {/* Submit Answers Button */}
        <TouchableOpacity onPress={submitAnswers} style={{ padding: 20, backgroundColor: 'blue', marginTop: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

export default QuizApp;
