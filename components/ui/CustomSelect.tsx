import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  ScrollView, 
  TouchableWithoutFeedback 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

export function CustomSelect({ label, value, options, onSelect }: CustomSelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.valueText, !value && styles.placeholder]}>
          {value || "Selecione uma opção"}
        </Text>
        <Feather name="chevron-down" size={20} color="#A0AEC0" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView bounces={false}>
                {options.map((option, index) => {
                  const isSelected = option === value;
                  const isLast = index === options.length - 1;
                  
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.option,
                        isSelected && styles.selectedOption,
                        !isLast && styles.borderBottom
                      ]}
                      onPress={() => {
                        onSelect(option);
                        setVisible(false);
                      }}
                    >
                      <Text style={[
                        styles.optionText, 
                        isSelected && styles.selectedOptionText
                      ]}>
                        {option}
                      </Text>
                      {isSelected && <Feather name="check" size={18} color="#01AEA4" />}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
    height: 56,
    paddingHorizontal: 16,
  },
  valueText: {
    fontSize: 16,
    color: '#2D3748',
  },
  placeholder: {
    color: '#A0AEC0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: 300,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  selectedOption: {
    backgroundColor: '#E6FFFA',
  },
  optionText: {
    fontSize: 16,
    color: '#4A5568',
  },
  selectedOptionText: {
    color: '#01AEA4', // Cor primária
    fontWeight: 'bold',
  },
});