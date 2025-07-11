import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const sections = [
  {
    id: '1',
    title: 'File-based Routing',
    content: 'This app uses file-based routing with two main screens: app/(tabs)/index.tsx and app/(tabs)/explore.tsx. The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.',
    link: 'https://docs.expo.dev/router/introduction',
    linkText: 'Learn more about routing',
  },
  {
    id: '2',
    title: 'Cross-Platform Support',
    content: 'This project runs on Android, iOS, and web. Press "w" in the terminal to open the web version.',
    link: null,
    linkText: null,
  },
  {
    id: '3',
    title: 'Dynamic Images',
    content: 'Use @2x and @3x suffixes for images to support different screen densities.',
    link: 'https://reactnative.dev/docs/images',
    linkText: 'Learn more about images',
    image: require('@/assets/images/react-logo.png'),
  },
  {
    id: '4',
    title: 'Custom Fonts',
    content: 'Load custom fonts like SpaceMono in app/_layout.tsx for a unique typography experience.',
    link: 'https://docs.expo.dev/versions/latest/sdk/font',
    linkText: 'Learn more about fonts',
  },
  {
    id: '5',
    title: 'Light & Dark Mode',
    content: 'This template supports light and dark modes using the useColorScheme() hook to adapt UI colors.',
    link: 'https://docs.expo.dev/develop/user-interface/color-themes/',
    linkText: 'Learn more about themes',
  },
  {
    id: '6',
    title: 'Animations',
    content: 'Explore animated components like HelloWave.tsx using react-native-reanimated for smooth effects.',
    link: null,
    linkText: null,
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const renderSection = ({ item, index }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} style={styles.card}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#1E3A8A', '#3B82F6'] : ['#60A5FA', '#BFDBFE']}
        style={styles.cardGradient}
      >
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.cardContent}>{item.content}</ThemedText>
        {item.image && (
          <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
        )}
        {item.link && (
          <ExternalLink href={item.link}>
            <ThemedText type="link" style={styles.cardLink}>
              {item.linkText}
            </ThemedText>
          </ExternalLink>
        )}
      </LinearGradient>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? ['#111827', '#1F2937'] : ['#EFF6FF', '#DBEAFE']}
        style={styles.header}
      >
        <ThemedText type="title" style={styles.headerTitle}>
          Discover
        </ThemedText>
        <Ionicons
          name="rocket-outline"
          size={40}
          color={colorScheme === 'dark' ? '#60A5FA' : '#1E3A8A'}
          style={styles.headerIcon}
        />
      </LinearGradient>

      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        style={styles.carousel}
      />

      <ThemedView style={styles.dotsContainer}>
        {sections.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcon: {
    marginTop: 10,
  },
  carousel: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E5E7EB',
  },
  cardImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cardLink: {
    marginTop: 10,
    fontSize: 16,
    color: '#BFDBFE',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#3B82F6',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});