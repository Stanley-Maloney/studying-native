import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    owners: '',
    heirs: '',
    latitude: '',
    longitude: '',
    area: '',
    soilType: '',
    mainCrop: '',
    acquisitionDate: '',
    notes: '',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    alert('Dados enviados com sucesso!');
    setIsSidebarOpen(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#111827', '#1F2937'] : ['#E6F0FA', '#B3CDE0']}
        style={styles.header}
      >
        <ThemedView style={styles.headerContent}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
            <Ionicons
              name={isSidebarOpen ? 'close' : 'menu'}
              size={30}
              color={colorScheme === 'dark' ? '#fff' : '#1E3A8A'}
            />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>
            Latifundiária Form
          </ThemedText>
          <HelloWave />
        </ThemedView>
      </LinearGradient>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutLeft}
          style={styles.sidebar}
        >
          <LinearGradient
            colors={colorScheme === 'dark' ? ['#1F2937', '#111827'] : ['#DBEAFE', '#EFF6FF']}
            style={styles.sidebarGradient}
          >
            <ThemedText type="subtitle" style={styles.sidebarTitle}>
              Navigation
            </ThemedText>
            <TouchableOpacity style={styles.sidebarItem} onPress={toggleSidebar}>
              <Ionicons name="home-outline" size={24} color={colorScheme === 'dark' ? '#fff' : '#1E3A8A'} />
              <ThemedText style={styles.sidebarText}>Home</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={toggleSidebar}>
              <Ionicons name="compass-outline" size={24} color={colorScheme === 'dark' ? '#fff' : '#1E3A8A'} />
              <ThemedText style={styles.sidebarText}>Explore</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={toggleSidebar}>
              <Ionicons name="settings-outline" size={24} color={colorScheme === 'dark' ? '#fff' : '#1E3A8A'} />
              <ThemedText style={styles.sidebarText}>Settings</ThemedText>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Main Content */}
      <ThemedView style={styles.content}>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
          resizeMode="contain"
        />
        <ScrollView style={styles.formContainer}>
          <ThemedText type="subtitle" style={styles.formTitle}>
            Land Ownership Form
          </ThemedText>
          <Input
            placeholder="Owner(s) Name(s)"
            value={formData.owners}
            onChangeText={(text) => handleInputChange('owners', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Heirs/Future Owners"
            value={formData.heirs}
            onChangeText={(text) => handleInputChange('heirs', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Latitude (e.g., -23.5505)"
            value={formData.latitude}
            onChangeText={(text) => handleInputChange('latitude', text)}
            keyboardType="numeric"
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Longitude (e.g., -46.6333)"
            value={formData.longitude}
            onChangeText={(text) => handleInputChange('longitude', text)}
            keyboardType="numeric"
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Area (hectares)"
            value={formData.area}
            onChangeText={(text) => handleInputChange('area', text)}
            keyboardType="numeric"
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Soil Type (e.g., Sandy, Clay)"
            value={formData.soilType}
            onChangeText={(text) => handleInputChange('soilType', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Main Crop (e.g., Soy, Corn)"
            value={formData.mainCrop}
            onChangeText={(text) => handleInputChange('mainCrop', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Acquisition Date (e.g., 2025-07-11)"
            value={formData.acquisitionDate}
            onChangeText={(text) => handleInputChange('acquisitionDate', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            placeholderTextColor="#666"
          />
          <Input
            placeholder="Additional Notes"
            value={formData.notes}
            onChangeText={(text) => handleInputChange('notes', text)}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
          <Button
            title="Submit"
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitButtonText}
            onPress={handleSubmit}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#4B91F7', '#2A69AC'],
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            }}
          />
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const createStyles = (colorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme === 'dark' ? '#111827' : '#F0F4F8',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colorScheme === 'dark' ? '#fff' : '#1E3A8A',
  },
  menuButton: {
    padding: 10,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    zIndex: 1000,
  },
  sidebarGradient: {
    flex: 1,
    padding: 30,
    paddingTop: 60,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colorScheme === 'dark' ? '#fff' : '#1E3A8A',
    marginBottom: 30,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  sidebarText: {
    fontSize: 18,
    color: colorScheme === 'dark' ? '#fff' : '#1E3A8A',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  reactLogo: {
    width: width * 0.5,
    height: 100,
    marginBottom: 20,
  },
  formContainer: {
    width: '95%',
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4B91F7',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#4B91F7',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  inputText: {
    fontSize: 16,
    color: colorScheme === 'dark' ? '#fff' : '#1E3A8A',
  },
  submitButton: {
    borderRadius: 25,
    height: 50,
    marginTop: 30,
    shadowColor: '#2A69AC',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 900,
  },
});
