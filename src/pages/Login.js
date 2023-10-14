// src/Login.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createAccount}>
            <Text style={styles.createAccountText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#6b1fc2', // Fundo roxo claro
        justifyContent: 'center',
        alignItems: 'center',
      },
      formContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
      },
      input: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5, // Bordas arredondadas
        padding: 10,
        borderColor: '#ccc',
      },
      loginButton: {
        backgroundColor: '#6a57d5', // Cor do botão de login
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
      },
      buttonText: {
        color: 'white',
      },
      forgotPassword: {
        marginVertical: 10,
      },
      forgotPasswordText: {
        color: 'white', // Cor do texto de "Esqueceu sua senha?"
      },
      createAccountText: {
        color: 'white', // Cor do texto de "Criar conta"
      },
    });

export default Login;
