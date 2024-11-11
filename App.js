import React, { useState } from 'react';
import { View, Text, Button, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 20,
        backgroundColor: 'whitesmoke',
    },
    submitButton: {
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const QuizQuestion = ({ imageSource, question, selectedValue, onValueChange }) => {
    return (
        <View style={{ marginBottom: 20 , marginTop: 20}}>
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
        </View>
    );
};

const QuizApp = () => {
    const [answers, setAnswers] = useState(["", "", ""]);
    const correctAnswers = ["Elephant", "Leopard", "Kingfisher", "Owl"];

    const questions = [
        { source: require('./img/elephant.jpg'), label: "What animal is this?" },
        { source: require('./img/leopard.jpg'), label: "What animal is this?" },
        { source: require('./img/kingfisher.jpg'), label: "What animal is this?" },
        { source: require('./img/owl.jpg'), label: "What animal is this?" },
    ];

    const updateAnswer = (value, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const submitAnswers = () => {
        let correctCount = 0;
        answers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                correctCount++;
            }
        });

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

        Alert.alert(message);
    };

    return (
        <ScrollView style={styles.parent}>
            {questions.map((item, index) => (
                <QuizQuestion
                    key={index}
                    imageSource={item.source}
                    question={item.label}
                    selectedValue={answers[index]}
                    onValueChange={(value) => updateAnswer(value, index)}
                />
            ))}
            <TouchableOpacity onPress={submitAnswers} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Answers</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default QuizApp;
