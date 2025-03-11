import React, { FC, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
  Button, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

const CameraScreen: FC = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string>('');
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Checking permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    if (scanned) {
      setScanned(false);
      setScannedData('');
    }
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      if (data !== scannedData) {
        setScanned(true);
        setScannedData(data);
        setTimeout(() => setScanned(false), 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          facing={facing}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.scanned}>
          <Text>{scannedData}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  scanned: {
    width: '100%',
    height: 80,
    backgroundColor: '#d1ccc0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
