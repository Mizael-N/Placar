import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

export default function App() {
  const [placarTimeA, setPlacarTimeA] = useState(0);
  const [placarTimeB, setPlacarTimeB] = useState(0);
  const [nomeTimeA, setNomeTimeA] = useState("Time A");
  const [nomeTimeB, setNomeTimeB] = useState("Time B");
  const [placaresSalvos, setPlacaresSalvos] = useState([]);
  const [modoEscuro, setModoEscuro] = useState(false);

  const adicionarPonto = (setPlacar, placar) => setPlacar(placar + 1);
  const removerPonto = (setPlacar, placar) => setPlacar(placar > 0 ? placar - 1 : 0);

  const resetarPlacar = () => {
    setPlacarTimeA(0);
    setPlacarTimeB(0);
  };

  const salvarPlacar = () => {
    const novoPlacar = {
      id: Date.now().toString(),
      nomeTimeA,
      nomeTimeB,
      placarTimeA,
      placarTimeB,
    };
    setPlacaresSalvos([...placaresSalvos, novoPlacar]);
    resetarPlacar();
  };

  const apagarPlacar = (id) => {
    setPlacaresSalvos(placaresSalvos.filter((placar) => placar.id !== id));
  };

  const toggleModoEscuro = () => setModoEscuro((prev) => !prev);

  const tema = modoEscuro ? estilosEscuros : estilosClaros;

  return (
    <ScrollView contentContainerStyle={tema.scrollContainer}>
      <View style={tema.container}>
        <View style={tema.header}>
          <Text style={tema.title}>Placar do Vôlei</Text>
          <TouchableOpacity onPress={toggleModoEscuro} style={tema.configButton}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/volleyball.png' }}
              style={tema.icon}
            />
          </TouchableOpacity>
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
            </View>
          </View>
        </View>

        <TouchableOpacity style={tema.saveButton} onPress={salvarPlacar}>
          <Text style={tema.saveButtonText}>Salvar Placar</Text>
        </TouchableOpacity>

        <Text style={tema.savedScoresTitle}>Placares Salvos</Text>
        <FlatList
          data={placaresSalvos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tema.savedScoreContainer}>
              <Text style={tema.savedScoreText}>
                {item.nomeTimeA} {item.placarTimeA} - {item.placarTimeB} {item.nomeTimeB}
              </Text>
              <TouchableOpacity onPress={() => apagarPlacar(item.id)}>
                <Text style={tema.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          style={tema.savedScoresList}
        />
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const estilosClaros = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    width: width * 0.9,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    flex: 1,
    textAlign: 'center',
  },
  configButton: {
    paddingHorizontal: 10,
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
    elevation: 5, // Sombra para destacar
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
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonRemove: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
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
  savedScoresTitle: {
    fontSize: 20,
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
    backgroundColor: '#E6E6FA', // Um tom suave para destaque
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3, // Sombra para destaque
  },
  savedScoreText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#FF6347',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

const estilosEscuros = StyleSheet.create({
  ...estilosClaros,
  scrollContainer: { ...estilosClaros.scrollContainer, backgroundColor: '#121212' },
  container: { ...estilosClaros.container, backgroundColor: '#121212' },
  title: { ...estilosClaros.title, color: '#BB86FC' },
  teamContainer: { ...estilosClaros.teamContainer, backgroundColor: '#1E1E1E' },
  saveButton: { ...estilosClaros.saveButton, backgroundColor: '#BB86FC' },
  saveButtonText: { ...estilosClaros.saveButtonText, color: '#FFFFFF' },
  savedScoresTitle: { ...estilosClaros.savedScoresTitle, color: '#BB86FC' },
  savedScoreContainer: { ...estilosClaros.savedScoreContainer, backgroundColor: '#333333' },
  savedScoreText: { ...estilosClaros.savedScoreText, color: '#FFFFFF' },
  deleteText: { ...estilosClaros.deleteText, color: '#CF6679' },
});

