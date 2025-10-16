import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function App() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(null);
  const [celular, setCelular] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const verificarEmail = () => {
    setEmailValido(null);
    setTimeout(() => {
      if (email.includes("@") && email.includes(".") && email.length > 5) {
        setEmailValido(true);
      } else {
        setEmailValido(false);
      }
    }, 800);
  };

  const formularioValido =
    nome &&
    emailValido &&
    celular.length === 15 &&
    nascimento.length === 10 &&
    senha.length >= 6 &&
    senha === confSenha &&
    especie &&
    sexo &&
    idade &&
    porte;

  const handleSubmit = () => {

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Alert.alert("Sucesso 🎉", "Cadastro enviado com sucesso!", [
        {
          text: "OK",
          onPress: () => {

            setNome(""); setEmail(""); setEmailValido(null); setCelular("");
            setNascimento(""); setSenha(""); setConfSenha(""); setEspecie("");
            setSexo(""); setIdade(""); setPorte("");
          },
        },
      ]);
    });
  };

  const BotaoSelecao = ({ valor, selecionado, onPress, emoji }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    
    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={[
            styles.botaoSelecao,
            selecionado === valor && styles.botaoSelecionado,
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => onPress(valor)}
          activeOpacity={0.8}
        >
          <Text style={styles.emoji}>{emoji}</Text>
          <Text
            style={[
              styles.textoBotaoSelecao,
              selecionado === valor && styles.textoBotaoSelecionado,
            ]}
          >
            {valor}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const StatusIcon = ({ valido }) => (
    <Text style={[styles.statusIcon, { color: valido ? "#4caf50" : "#f44336" }]}>
      {valido ? "✓" : "✗"}
    </Text>
  );

  const InputIcon = ({ emoji }) => (
    <Text style={styles.inputIcon}>{emoji}</Text>
  );

  const containerStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: slideAnim },
      { scale: scaleAnim }
    ],
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.animatedContainer, containerStyle]}>

          <View style={styles.header}>
            <Text style={styles.emojiGrande}>🐾</Text>
            <Text style={styles.titulo}>Cadastro para Adoção</Text>
            <Text style={styles.subtituloHeader}>Encontre seu novo amigo</Text>
          </View>


          <View style={styles.secao}>
            <View style={styles.tituloSecao}>
              <Text style={styles.emojiSecao}>👤</Text>
              <Text style={styles.tituloSecaoTexto}>Seus Dados</Text>
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="👤" />
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#90a4ae"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="📧" />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#90a4ae"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={verificarEmail}
              />
              {emailValido !== null && (
                <StatusIcon valido={emailValido} />
              )}
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="📱" />
              <TextInputMask
                style={styles.input}
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                placeholder="Celular"
                placeholderTextColor="#90a4ae"
                value={celular}
                onChangeText={setCelular}
              />
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="📅" />
              <TextInputMask
                style={styles.input}
                type={"datetime"}
                options={{ format: "DD/MM/YYYY" }}
                placeholder="Data de Nascimento"
                placeholderTextColor="#90a4ae"
                value={nascimento}
                onChangeText={setNascimento}
              />
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="🔒" />
              <TextInput
                style={styles.input}
                placeholder="Senha (mín. 6 caracteres)"
                placeholderTextColor="#90a4ae"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <View style={styles.inputContainer}>
              <InputIcon emoji="🔒" />
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                placeholderTextColor="#90a4ae"
                secureTextEntry
                value={confSenha}
                onChangeText={setConfSenha}
              />
              {senha && confSenha && (
                <StatusIcon valido={senha === confSenha} />
              )}
            </View>
          </View>


          <View style={styles.secao}>
            <View style={styles.tituloSecao}>
              <Text style={styles.emojiSecao}>❤️</Text>
              <Text style={styles.tituloSecaoTexto}>Preferências para Adoção</Text>
            </View>

            <Text style={styles.label}>Espécie</Text>
            <View style={styles.linha}>
              <BotaoSelecao 
                valor="Cachorro" 
                selecionado={especie} 
                onPress={setEspecie} 
                emoji="🐕"
              />
              <BotaoSelecao 
                valor="Gato" 
                selecionado={especie} 
                onPress={setEspecie} 
                emoji="🐈"
              />
            </View>

            <Text style={styles.label}>Sexo</Text>
            <View style={styles.linha}>
              <BotaoSelecao 
                valor="Macho" 
                selecionado={sexo} 
                onPress={setSexo} 
                emoji="♂️"
              />
              <BotaoSelecao 
                valor="Fêmea" 
                selecionado={sexo} 
                onPress={setSexo} 
                emoji="♀️"
              />
            </View>

            <Text style={styles.label}>Idade</Text>
            <View style={styles.linha}>
              <BotaoSelecao 
                valor="Filhote" 
                selecionado={idade} 
                onPress={setIdade} 
                emoji="🐾"
              />
              <BotaoSelecao 
                valor="Adulto" 
                selecionado={idade} 
                onPress={setIdade} 
                emoji="🐕"
              />
              <BotaoSelecao 
                valor="Idoso" 
                selecionado={idade} 
                onPress={setIdade} 
                emoji="🐩"
              />
            </View>

            <Text style={styles.label}>Porte</Text>
            <View style={styles.linha}>
              <BotaoSelecao 
                valor="Pequeno" 
                selecionado={porte} 
                onPress={setPorte} 
                emoji="S"
              />
              <BotaoSelecao 
                valor="Médio" 
                selecionado={porte} 
                onPress={setPorte} 
                emoji="M"
              />
              <BotaoSelecao 
                valor="Grande" 
                selecionado={porte} 
                onPress={setPorte} 
                emoji="L"
              />
            </View>
          </View>


          <TouchableOpacity
            style={[
              styles.botaoSubmit,
              formularioValido && styles.botaoSubmitAtivo,
            ]}
            disabled={!formularioValido}
            onPress={handleSubmit}
            activeOpacity={0.9}
          >
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.textoSubmit}>Quero Adotar!</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f6",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  animatedContainer: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  emojiGrande: {
    fontSize: 50,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#d9542d",
    marginTop: 10,
    textAlign: "center",
  },
  subtituloHeader: {
    fontSize: 16,
    color: "#7a8b3b",
    marginTop: 5,
    textAlign: "center",
    fontWeight: "500",
  },
  secao: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    shadowColor: "#d9542d",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ffe8dc",
  },
  tituloSecao: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  emojiSecao: {
    fontSize: 28,
    marginRight: 12,
  },
  tituloSecaoTexto: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2d3319",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5ede5",
    borderRadius: 14,
    marginBottom: 15,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "#fdd9c9",
  },
  inputIcon: {
    marginRight: 12,
    fontSize: 18,
  },
  input: {
    flex: 1,
    color: "#2d3319",
    fontSize: 16,
    paddingVertical: 14,
  },
  statusIcon: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "700",
    color: "#7a8b3b",
    marginBottom: 12,
    fontSize: 15,
    marginTop: 8,
  },
  linha: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
    flexWrap: "wrap",
  },
  botaoSelecao: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e8d3c6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#fef5f0",
    minWidth: 100,
    gap: 8,
  },
  botaoSelecionado: {
    backgroundColor: "#ffa366",
    borderColor: "#ff8a3d",
  },
  emoji: {
    fontSize: 18,
  },
  textoBotaoSelecao: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7a8b3b",
  },
  textoBotaoSelecionado: {
    color: "#ffffff",
    fontWeight: "700",
  },
  botaoSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#7a8b3b",
    gap: 12,
    shadowColor: "#7a8b3b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  botaoSubmitAtivo: {
    backgroundColor: "#d9542d",
    shadowColor: "#d9542d",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  textoSubmit: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});