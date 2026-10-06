import { Text, TextInput, StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { theme } from '../../constants/theme';

type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'decimal-pad';
  hasError?: boolean;
};

export const AppInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  hasError = false,
}: AppInputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, hasError && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: theme.spacing.small,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.radius.medium,
    padding: 14,
    marginBottom: theme.spacing.medium,
    color: colors.text,
  },

  inputError: {
    borderColor: colors.error,
  },
});
