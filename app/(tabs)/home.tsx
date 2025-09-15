// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import IconAlnuzul from '@/app/components/IconAlnuzul';
import { Image } from "expo-image";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
export default function Home() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("ar"); // "ar" or "en"
  const translateX = useRef(new Animated.Value(language === "ar" ? 0 : 30)).current;

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";

    setLanguage(newLang);

    Animated.timing(translateX, {
      toValue: newLang === "ar" ? 0 : 33,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    fetch("https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/index.json")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.pageProps.surahs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  
 console.log(surahs[0], 'sssssssssssssssssssssssssssss')
  return (
    <SafeAreaView className="flex-1 p-2 bg-[#edf0f4]">
      {/* زر لتغيير اللغة */}
      {/* <TouchableOpacity
        onPress={() => setLanguage(language === "ar" ? "en" : "ar")}
        className="mb-4 bg-green-500 py-2 px-4 rounded"
      >
        <Text className="text-white text-center">
          {language === "ar" ? "Switch to English" : "التبديل للعربية"}
        </Text>
      </TouchableOpacity> */}
      <View className="flex flex-row items-center justify-between p-2 ">
        <TouchableOpacity
          onPress={toggleLanguage}
          className="w-20 h-10  rounded-full flex-row items-center px-1 relative border border-emerald-600"
          activeOpacity={0.8}
        >
          {/* النصوص */}
          <Text className="absolute left-3 text-xs font-bold">AR</Text>
          <Text className="absolute right-3 text-xs font-bold">EN</Text>

          {/* الدائرة المتحركة */}
          <Animated.View
            className="w-8 h-8 bg-emerald-200/30 rounded-full shadow border border-emerald-600"
            style={{
              transform: [{ translateX }],
            }}
          />
        </TouchableOpacity>
        <Image source={icons.holy} style={{ width: 50, height: 50, borderRadius: 50 }} />

      </View>

      {/* عرض السور */}
      <FlatList

        data={surahs}
        keyExtractor={(item) => item?.number.toString()}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => router.push(`/surah/${item?.number}`)}>
            <View className="py-3 border-b border-gray-300 bg-white my-2 border   px-3  shadow rounded-md ">
            <Text className="text-lg font-bold  rounded ">
              {language === "ar" ? `${item.name.ar}  - ${item?.number}` : `${item?.number} - ${item.name.en} `}
            </Text>

            <View className="flex -items-center justify-between flex-row mt-2">
              {item?.revelation_place?.en == 'meccan' ? <Image source={icons.kaaba} style={{ width: 25, height: 25 }} />
                : <Image source={icons.qubaa} style={{ width: 25, height: 25 }} />}
              <Text className="text-md font-semibold text-gray-500 italic">
                {item?.verses_count} Verses
              </Text>
            </View>


          </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
