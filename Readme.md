# Placar do Vôlei

Este é um aplicativo de placar de vôlei desenvolvido em React Native. Ele permite controlar o placar dos times, salvar partidas, ativar modo escuro, cronômetro, e mais.

## Funcionalidades Principais

- **Controle de Placar**: Adicione, remova e resete pontos para cada time.
- **Salvar Placar**: Salve o placar de uma partida para referência futura.
- **Modo Claro e Escuro**: Alterne entre modo claro e modo escuro.
- **Cronômetro**: Controle de tempo com botões para iniciar, pausar e resetar.
- **Sons de Partida**: Sons personalizados para o início e fim da partida.

## Mudanças Recentes

### Versão 1.0.8
- **Correções de bugs**
    - Ajustes na splashScreen para comportar diferentes orientações de tela ao iniciar o app

- **Pequenos ajustes de design**
    - Alteração dos tamanhos dos títulos principais
    - Ajuste no tamanho dos textos em placares salvos

### Versão 1.0.7
- **Mudanças no design**:
    - Adição de icones no lugar dos textos do cronômetro
    - Nova SplashScreen
    - Novo título para o app
- **Correção de bugs**
    - Modo escuro agora preenche todo o background do app

### Versão 1.0.6
- **Adição de sons**:
    - Som de apito inicial da partida ao iniciar o cronômetro e de fim ao resetar;


### Versão 1.0.5
- **Adição do cronômetro**: 
    - Agora é possível marcar o tempo de uma partida;
    - Controles de inicio, pausa e resetar;
- **Correções e melhorias no design**: 
    - Título alinhado no centro;
    - Botões de controle de placar melhorados;
    - Rolagem em todo o app e não somente na área de placares salvos;
    - Agora o time vencedor tem o placar salvo em verde e o perdedor em vermelho

### Versão 1.0.4
-  **Correção de Bugs**: Correção de problemas de estabilidade e performance.

### Versão 1.0.3
- **Adicionado Data e Hora dos placares**: Agora você pode visualizar a data e hora em que cada placar foi salvo;
- **Mudança no ícone do modo escuro**: O ícone do modo escuro foi atualizado para melhorar a experiência do usuário;
- **Agora o app funciona na Horizontal**: Adicionado suporte a rotação de tela.
- **Correção de bugs**:
    - Fechamento inesperado ao ativar modo escuro;
    - Nomes dos times e placares não podiam ser enxergados no modo escuro;
    - Ícone do vôlei sobrepunha o título do app;
    - Ícone ao instalar o app ajustado.



### Versão 1.0.2
- **Adicionado Modo Escuro**: Mudança na aparência do aplicativo para modo escuro ao clicar no ícone da bola de vôlei.


### Versão 1.0.1
- **Tela de Placar Salvo**: 
    - Adicionada a exibição de placares salvos na tela principal;
    - Botão para excluir placares salvos individualmente;
- **Ícone de Bola de Vôlei**: Adicionada a bola de vôlei como ícone no cabeçalho do app.

### Versão 1.0.0
- **Lançamento Inicial**:
    - Implementação básica do controle de placar;
    - Entrada de texto para os nomes dos times;
    - Botões para adicionar, remover e resetar pontos.

## Como Usar

1. **Controle de Placar**: 
    - Use os botões "+" e "-" para adicionar ou remover pontos dos times;
    - O botão de reset individual zera o placar do time selecionado.

2. **Salvar Placar**:
    - Clique em "Salvar Placar" para armazenar o resultado de uma partida;
    - Veja todos os placares salvos na seção "Placares Salvos".

3. **Modo Escuro**:
    - Toque no ícone de sol ou lua no cabeçalho para alternar entre os modos.

4. **Cronômetro**:
    - Clique em "Iniciar" para começar a contagem, "Pausar" para parar temporariamente, e "Resetar" para zerar o tempo;
    - Sons de início e fim são reproduzidos ao clicar nos botões "Iniciar" e "Resetar" respectivamente

## Tecnologias Utilizadas

- **React Native**
- **Expo**
- **react-native-vector-icons**: Ícones para os botões e modo escuro/claro.
- **react-native-sound**: Gerenciamento de sons para início e fim de partida.

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git

2. cd seu-repositorio
npm install

3. npx expo start
