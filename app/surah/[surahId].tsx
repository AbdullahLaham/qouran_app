// app/surah/[id].tsx

import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Animated, ScrollView, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useFonts } from "expo-font";



export default function SurahId() {

  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [viewState, setViewState] = useState<'joined' | 'splitted'>('joined');
  const [language, setLanguage] = useState("ar"); // "ar" or "en"





  // hooks
  const navigation = useNavigation();
  const { surahId: id } = useLocalSearchParams<any>();
  console.log(id, 'rrrrrrrrrrrrrrrrrrrrrrrr');

  const translateViewX = useRef(new Animated.Value(viewState === "joined" ? 0 : 30)).current;
  const translateLangX = useRef(new Animated.Value(viewState === "joined" ? 0 : 30)).current;

  const currentId = parseInt(id || "1");

  // معلومات عن السور السابقة والتالية
  const prevId = currentId > 1 ? currentId - 1 : null;
  const nextId = currentId < 114 ? currentId + 1 : null;

  const [prevSurah, setPrevSurah] = useState<any>(null);
  const [nextSurah, setNextSurah] = useState<any>(null);




  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";

    setLanguage(newLang);

    Animated.timing(translateLangX, {
      toValue: newLang === "ar" ? 0 : 33,
      duration: 350,
      useNativeDriver: true,
    }).start();


  };


  const toggleMode = () => {
    const newLang = viewState === "joined" ? "splitted" : "joined";

    setViewState(newLang);

    Animated.timing(translateViewX, {
      toValue: newLang === "joined" ? 0 : 33,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!id) return;
    console.log(id, 'rrrrrrrrrrrrrrrrrrrrrrrr')

    const fetchSurah = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/quran/${id}.json?surahId=${id}`)
        const data = res.data;
        setSurah(data.pageProps.surah);

        // تحديث العنوان باسم السورة
        navigation.setOptions({
          title: data.pageProps.surah.name.ar,
        });
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
    const fetchNeighbor = async (id: number, setFn: any) => {
      try {
        const res = await fetch(
          `https://www.askalquran.com/_next/data/iXzNJArydAzbEbs3e5DqK/quran/${id}.json?surahId=${id}`
        );
        const data = await res.json();
        setFn(data.pageProps.surah);
      } catch {}
    };

    fetchSurah();
    if (prevId) fetchNeighbor(prevId, setPrevSurah);
    if (nextId) fetchNeighbor(nextId, setNextSurah);
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="mt-2 text-gray-500">Loading...</Text>
      </View>
    );
  }

  if (!surah) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 font-bold">Surah not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}

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
              transform: [{ translateX: translateLangX }],
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleMode}
          className="w-20 h-10  rounded-full flex-row items-center px-1 relative border border-emerald-600"
          activeOpacity={0.8}
        >
          {/* النصوص */}
          <Text className="absolute left-2 text-lg font-bold">📖</Text>
          <Text className="absolute right-2 text-lg font-bold">🌐</Text>

          {/* الدائرة المتحركة */}
          <Animated.View
            className="w-8 h-8 bg-emerald-200/30 rounded-full shadow border border-emerald-600"
            style={{
              transform: [{ translateX: translateViewX }],
            }}
          />
        </TouchableOpacity>

        <Image source={icons.holy} style={{ width: 50, height: 50, borderRadius: 50 }} />

      </View>
      {/* أزرار التنقل */}
<View className="flex-row justify-between items-center p-4 bg-white border-t border-gray-200">
  {prevId && prevSurah && (
    <Pressable
      onPress={() => router.push(`/surah/${prevId}`)}
      className="bg-green-600 px-4 py-2 rounded-xl"
    >
      <Text className="text-white font-bold">
        ◀ {prevSurah.name.ar}
      </Text>
    </Pressable>
  )}

  {nextId && nextSurah && (
    <Pressable
      onPress={() => router.push(`/surah/${nextId}`)}
      className="bg-green-600 px-4 py-2 rounded-xl ml-auto"
    >
      <Text className="text-white font-bold">
        {nextSurah.name.ar} ▶
      </Text>
    </Pressable>
  )}
</View>





      {/* Verses */}


      <ScrollView>

        {language === "ar" ? (
          // <View className="p-4 bg-green-600 m-2 rounded-lg">
          //   <Text className="text-2xl font-bold text-white text-center">
          //     {surah.name.ar} ({surah.name.transliteration})
          //   </Text>
          //   <Text className="text-center text-white mt-1">
          //     {surah.revelation_place.ar.toUpperCase()}
          //   </Text>
          //   <Text className="text-center text-sm text-gray-200 mt-1">
          //     {surah.verses_count} آية • {surah.words_count} كلمة • {surah.letters_count} حرف
          //   </Text>
          // </View>
          <View className="space-y-2 p-2 bg-green-600 m-2 rounded-lg flex flex-col items-end gap-1" >
            <Text className="text-3xl mx-auto font-bold text-white text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>
              سورة {surah.name.ar} ({surah.name.transliteration})
            </Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }} >اسم السورة بالعربي: {surah.name.ar}</Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl" }}>اسم السورة بالإنجليزي: {surah.name.transliteration}</Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl" }}>مكان النزول: {surah.revelation_place.ar}</Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl" }}>آيات: {surah.verses_count}</Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl" }}>عدد الكلمات: {surah.words_count}</Text>
            <Text className="text-white font-bold" style={{ writingDirection: "rtl" }}>عدد الحروف: {surah.letters_count}</Text>
          </View>
        ) : (
          // <View className="p-4 bg-green-600 m-2 rounded-lg">
          //   <Text className="text-2xl font-bold text-white text-center">
          //     {surah.name.en} ({surah.name.transliteration})
          //   </Text>
          //   <Text className="text-center text-white mt-1">
          //     {surah.revelation_place.en.toUpperCase()}
          //   </Text>
          //   <Text className="text-center text-sm text-gray-200 mt-1">
          //     {surah.verses_count} verses • {surah.words_count} words • {surah.letters_count} letters
          //   </Text>
          // </View>
          <View className="space-y-2 bg-green-600 m-2 rounded-lg flex flex-col items-start p-4 gap-1">
            <Text className="text-3xl mx-auto font-bold text-white text-center mb-2">
              Surah {surah.name.transliteration}
            </Text>
            <Text className="text-white">Surah Name: {surah.name.transliteration}</Text>
            <Text className="text-white">Meaning: {surah.name.en}</Text>
            <Text className="text-white">Revelation Place: {surah.revelation_place.en}</Text>
            <Text className="text-white">Verses: {surah.verses_count}</Text>
            <Text className="text-white">Word Count: {surah.words_count}</Text>
            <Text className="text-white">Letter Count: {surah.letters_count}</Text>
          </View>
        )}
        {viewState === "joined" ? (
          <View className="p-4">
            <Text className="text-2xl leading-loose text-green-800 font-arabic text-right mx-auto"> بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</Text>
            <Text className="text-2xl leading-loose text-green-800 font-arabic text-right">
              {surah.verses
                .map((v: any) => `${v.text.ar} ﴿${v.number}﴾`)
                .join(" ")}
            </Text>
          </View>
        ) : (
          <FlatList
            data={surah.verses}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={{ padding: 12 }}
            renderItem={({ item }) => (
              <View className="mb-4 p-4 bg-white rounded-xl shadow">
                <Text className="text-xl font-arabic text-right text-green-800 leading-relaxed">
                  {item.text.ar} ﴿{item.number}﴾
                </Text>
                <Text className="text-gray-600 mt-2">{item.text.en}</Text>
              </View>
            )}
          />
        )}


      </ScrollView>

    </SafeAreaView>
  );
}
