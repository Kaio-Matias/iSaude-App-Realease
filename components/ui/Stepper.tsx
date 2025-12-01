import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface StepperProps {
  totalSteps: number;
  currentStep: number;
}

export function Stepper({ totalSteps, currentStep }: StepperProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const step = idx + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <React.Fragment key={step}>
            {/* Linha de conexão entre os passos */}
            {idx > 0 && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: isCompleted ? '#01AEA4' : isActive ? '#4576F2' : '#E5E7EB' }
                ]}
              />
            )}
            
            {/* Círculo do passo */}
            <View
              style={[
                styles.stepCircle,
                { 
                  backgroundColor: isCompleted ? '#01AEA4' : isActive ? '#4576F2' : '#E5E7EB',
                  borderColor: isCompleted ? '#01AEA4' : isActive ? '#4576F2' : '#E5E7EB'
                }
              ]}
            >
              {isCompleted ? (
                <Feather name="check" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepText, { color: isActive ? '#fff' : '#A0AEC0' }]}>
                  {step}
                </Text>
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});