import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SurahView = ({viewState, surah}: any) => {
    
  return (
    <View>
      {viewState === "joined" ? (
          <View className="p-2">
            <Text className="text-2xl leading-loose  font-bold text-right mx-auto text-[#4db6ac]"  style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"}</Text>
            {Object.values(
              surah.verses.reduce((acc: any, verse: any) => {
                const page = verse.page;
                if (!acc[page]) acc[page] = [];
                acc[page].push(verse);
                return acc;
              }, {})
            ).map((versesInPage: any, index: number) => (
              <View key={index} className="mb-6">
                {/* النصوص المجمعة لصفحة واحدة */}

                <Text className="text-2xl leading-loose text-green-800 font-arabic text-center" style={{ fontFamily: 'hafs' }}>
                  {versesInPage
                    .map((v: any) => `${v.text.ar} ﴿${v.number}﴾`)
                    .join(" ")}
                </Text>

                {/* خط الفاصل مع رقم الصفحة */}
                <View className="mt-4 mb-2 border-t border-gray-300">
                  <Text className="text-center w-full mt-1 bg-[#4db6ac] p-2 rounded-full text-white  mx-auto">
                    {versesInPage[0].page}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-2xl  font-bold text-right mx-auto text-[#4db6ac]" style={{ fontFamily: 'bismillah' }}>{surah.number == 9 ? "أعوذ بالله من الشيطان الرجيم" : "بسم الله الرحمن الرحيم"} </Text>
            <FlatList
              data={surah.verses}
              keyExtractor={(item) => item.number.toString()}
              contentContainerStyle={{ padding: 12 }}
              renderItem={({ item }) => (
                <View className="mb-4 p-4 bg-white rounded-xl shadow" style={{ fontFamily: 'hafs' }}>
                  <Text className="text-xl font-arabic text-right text-green-800 leading-relaxed" style={{ fontFamily: 'hafs' }}>
                    {item.text.ar} ﴿{item.number}﴾
                  </Text>
                  <Text className="text-gray-600 mt-2" style={{ fontFamily: 'hafs' }}>{item.text.en}</Text>
                </View>
              )}
            />
          </View>
        )}
    </View>
  )
}

export default SurahView

const styles = StyleSheet.create({})