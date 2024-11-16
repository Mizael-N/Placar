import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import usaFlag from './assets/usa_flag.png';
import languages from './locales/languages.json';


export default function App() {
  const [placarTimeA, setPlacarTimeA] = useState(0);
  const [placarTimeB, setPlacarTimeB] = useState(0);
  const [nomeTimeA, setNomeTimeA] = useState("Player 1");
  const [nomeTimeB, setNomeTimeB] = useState("Player 2");
  const [placaresSalvos, setPlacaresSalvos] = useState([]);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [sound, setSound] = useState(null);
  const [Running, setRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [language, setLanguage] = useState('pt'); // Estado para o idioma ('pt' para português, 'en' para inglês)


  // Utilizando o arquivo JSON para textos
  const texts = languages;

  // Carrega e reproduz o som
  async function playSound(soundFile) {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  }

  // Limpa o som quando o componente é desmontado
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  // Iniciar cronômetro e som de início
  const startTimer = () => {
    setRunning(true);
    playSound(require('./assets/inicio.mp3'));
  };

  // Pausar cronômetro
  const pauseTimer = () => {
    setRunning(false);
  };

  // Resetar cronômetro e som de encerramento
  const resetTimer = () => {
    setRunning(false);
    setTimer(0);
    playSound(require('./assets/encerrar.mp3'));
  };

  useEffect(() => {
    let interval;
    if (Running) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 3000);
    } else if (!Running && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [Running]);

  const adicionarPonto = (setPlacar, placar) => setPlacar(placar + 1);
  const removerPonto = (setPlacar, placar) => setPlacar(placar > 0 ? placar - 1 : 0);
  const resetarPlacar = () => {
    setPlacarTimeA(0);
    setPlacarTimeB(0);
  };

  const salvarPlacar = () => {
    const dataHoraAtual = new Date().toLocaleString();
    const novoPlacar = {
      id: Date.now().toString(),
      nomeTimeA,
      nomeTimeB,
      placarTimeA,
      placarTimeB,
      dataHora: dataHoraAtual,
    };
    setPlacaresSalvos([...placaresSalvos, novoPlacar]);
    resetarPlacar();
  };

  const apagarPlacar = (id) => {
    setPlacaresSalvos(placaresSalvos.filter((placar) => placar.id !== id));
  };

  const toggleModoEscuro = () => setModoEscuro((prev) => !prev);
  
  // Função para alternar o idioma
  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const tema = modoEscuro ? estilosEscuros : estilosClaros;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: modoEscuro ? '#121212' : '#FFFFFF' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={modoEscuro ? 'light-content' : 'dark-content'} />
      <View style={[tema.container, { paddingTop: 40 }]}>
        <View style={tema.header}>
          <Text style={tema.title}>{texts[language].title}</Text>
          
          {/* Botão para alternar modo claro/escuro */}
          <TouchableOpacity onPress={toggleModoEscuro} style={tema.configButton}>
            <Icon
              name={modoEscuro ? "wb-sunny" : "dark-mode"} 
              size={30}
              color={modoEscuro ? "#FFD700" : "#1E90FF"} 
            />
          </TouchableOpacity>
          
          {/* Ícone para troca de idioma */}
          <TouchableOpacity onPress={toggleLanguage} style={{ marginLeft: 10 }}>
            <Image source={usaFlag} style={{ width: 35, height: 40 }} />
          </TouchableOpacity>
        </View>

        {/* Cronômetro */}
        <View style={tema.timerContainer}>
          <Text style={tema.timerText}>{`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</Text>
          <View style={tema.timerButtons}>
            <TouchableOpacity onPress={startTimer} style={tema.timerButton}>
              <Icon name="play-arrow" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseTimer} style={tema.timerButton}>
              <Icon name="pause" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={resetTimer} style={tema.timerButton}>
              <Icon name="replay" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tema.scoreContainer}>
          <View style={tema.teamContainer}>
            <TextInput
              style={tema.teamNameInput}
              onChangeText={setNomeTimeA}
              value={nomeTimeA}
              placeholder="Nome do Time A"
            />
            <Text style={tema.score}>{placarTimeA}</Text>
            <View style={tema.buttonContainer}>
              <TouchableOpacity style={tema.buttonAdd} onPress={() => adicionarPonto(setPlacarTimeA, placarTimeA)}>
                <Text style={tema.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tema.buttonRemove} onPress={() => removerPonto(setPlacarTimeA, placarTimeA)}>
                <Text style={tema.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tema.buttonReset} onPress={() => setPlacarTimeA(0)}>
                <Icon name="refresh" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={tema.teamContainer}>
            <TextInput
              style={tema.teamNameInput}
              onChangeText={setNomeTimeB}
              value={nomeTimeB}
              placeholder="Nome do Time B"
            />
            <Text style={tema.score}>{placarTimeB}</Text>
            <View style={tema.buttonContainer}>
              <TouchableOpacity style={tema.buttonAdd} onPress={() => adicionarPonto(setPlacarTimeB, placarTimeB)}>
                <Text style={tema.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tema.buttonRemove} onPress={() => removerPonto(setPlacarTimeB, placarTimeB)}>
                <Text style={tema.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tema.buttonReset} onPress={() => setPlacarTimeB(0)}>
                <Icon name="refresh" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={tema.saveButton} onPress={salvarPlacar}>
          <Text style={tema.saveButtonText}>{texts[language].saveScore}</Text>
        </TouchableOpacity>

        <Text style={tema.savedScoresTitle}>{texts[language].savedScores}</Text>

        <FlatList
          data={placaresSalvos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const corPlacarTimeA = item.placarTimeA > item.placarTimeB ? tema.winnerScore : tema.loserScore;
            const corPlacarTimeB = item.placarTimeB > item.placarTimeA ? tema.winnerScore : tema.loserScore;
            return (
              <View style={tema.savedScoreContainer}>
                <Text style={tema.savedScoreText}>
                  {item.nomeTimeA} <Text style={corPlacarTimeA}>{item.placarTimeA}</Text> - <Text style={corPlacarTimeB}>{item.placarTimeB}</Text> {item.nomeTimeB}
                </Text>
                <Text style={tema.savedScoreDate}>{item.dataHora}</Text>
                <TouchableOpacity onPress={() => apagarPlacar(item.id)} style={tema.deleteButton}>
                  <Text style={tema.deleteText}>x</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          contentContainerStyle={tema.savedScoresList}
          showsVerticalScrollIndicator={false}
        />
      </View> 
    </ScrollView>
  );
}


const estilosClaros = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333'
  },
  timerButtons: {
    flexDirection: 'row',
    marginTop: 10
  },
  timerButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5
  },
  timerButtonText: {
    color: '#FFF',
    fontSize: 16
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    flex: 1,
    textAlign: 'center',
    marginLeft: 80,
  },
  configButton: {
    flexDirection: 'column',
    alignItems:'center',
    paddingHorizontal: 5,
    marginHorizontal: 5,

  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  teamContainer: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  teamNameInput: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    width: '100%',
    textAlign: 'center',
  },
  score: {
    fontSize: 48,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Isso mantém o espaço entre os botões
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
  },
  buttonRemove: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
  },
  buttonReset: {
    backgroundColor: '#FFA500',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
    justifyContent: 'center', // Centraliza o ícone no botão  
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  savedScoreDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 20,
    marginTop: 0,
  },

  savedScoresTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 30,
  },
  savedScoresList: {
    width: '100%',
    marginTop: 10,
  },
  savedScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3,
    alignItems: 'center',
  },
  savedScoreText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  winnerScore: {
    color: 'green',
    fontWeight: 'bold',
  },
  loserScore: {
    color: 'red',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 7,
    borderRadius: 5,
    marginLeft: 15,
    elevation: 3,
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

const estilosEscuros = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#121212',
    paddingVertical: 20,

  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#121212',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#BB86FC'
  },
  timerButtons: {
    flexDirection: 'row',
    marginTop: 10
  },
  timerButton: {
    backgroundColor: '#BB86FC',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5
  },
  timerButtonText: {
    color: '#000',
    fontSize: 16
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BB86FC',
    flex: 1,
    textAlign: 'center',
    marginLeft: 80,
  },
  configButton: {
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  teamContainer: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  teamNameInput: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    width: '100%',
    textAlign: 'center',
  },
  score: {
    fontSize: 48,
    color: '#BB86FC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Isso mantém o espaço entre os botões
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
  },
  buttonRemove: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
  },
  buttonReset: {
    backgroundColor: '#FFA500',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1, // Faz o botão ocupar o mesmo espaço
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
    justifyContent: 'center', // Centraliza o ícone no botão  
  },
  buttonText: {
    fontSize: 24,
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
  },
  savedScoreDate: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 0,
  },

  savedScoresTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginTop: 30,
  },
  savedScoresList: {
    width: '100%',
    marginTop: 10,
  },
  savedScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3,
    alignItems: 'center',
  },
  savedScoreText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  winnerScore: {
    color: 'green',
    fontWeight: 'bold',
  },
  loserScore: {
    color: 'red',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#CF6679',
    padding: 7,
    borderRadius: 7,
    marginLeft: 15,
    elevation: 3,
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
