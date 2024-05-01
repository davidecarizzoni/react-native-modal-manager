import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Modal, { BaseCenterModalContainer, BaseBottomModalContainer } from "./src/modal-manager";

function App() {
  const showBottomModal = () => {
    Modal.show({
      children: (
        <BaseBottomModalContainer style={{ height: 400, backgroundColor: 'white' }}>
          <Text>Bottom modal</Text>
        </BaseBottomModalContainer>
      ),
      dismissable: true,
      position: 'bottom',
    });
  };
  
  const showCenteredModal = () => {
    Modal.show({
      children: (
        <BaseCenterModalContainer style={{ height: 400, backgroundColor: 'white' }}>
          <Text>Center modal</Text>
        </BaseCenterModalContainer>
      ),
      dismissable: true,
      position: 'center',
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={showBottomModal}>
        <Text>show bottom modal</Text>
      </TouchableOpacity>
      <View style={{ height: 40}}/>
      <TouchableOpacity onPress={showCenteredModal}>
        <Text>show center modal</Text>
      </TouchableOpacity>
      <Modal />
    </SafeAreaView>
  );
}

export default App;
