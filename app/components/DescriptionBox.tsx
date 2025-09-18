import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DescriptionBox = ({surah, language, mainColor}: any) => {
    console.log('rrrrrrrrrrrrppppppppppppppppppppp', surah);
  return (
    <View>
       {language === "ar" ? (
          // <View className="p-4 bg-[#4db6ac] m-2 rounded-lg">
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


    <View className="w-[95%] bg-white max-w-[700px] bg-card-bg rounded-md p-3 mt-5 mx-auto border border-gray-100 relative">
      {/* Title Floating Above Box */}
      <Text className="absolute bg-emerald-500  left-1/2 -top-4 text-white  -translate-x-1/2 bg-gradient px-5 py-1 rounded text-text-white whitespace-nowrap">
معلومات عن السورة      </Text>

      {/* Info Details */}
      <View className="flex flex-wrap justify-center items-center gap-2 mt-5">
        <Text className="bg-[#edf0f4] px-auto text-center py-2 rounded text-base flex-1 w-[70%] mx-auto  ">
          اسم السورة: <Text className={`text-${mainColor}`}>{surah.name.ar}</Text>
        </Text>

        <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
          مكان النزول: <Text className="text-primary-color">{surah.revelation_place.ar.toUpperCase()}</Text>
        </Text>

        <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
          عدد الآيات: <Text className="text-primary-color">{surah.verses_count}</Text>
        </Text>

        <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
          عدد الكلمات: <Text className="text-primary-color">{surah.words_count}</Text>
        </Text>

        <Text className="bg-[#edf0f4] px-5 py-2 rounded text-base">
          عدد الحروف: <Text className="text-primary-color">{surah.letters_count}</Text>
        </Text>
      </View>
    </View>
  


          // <View className="space-y-2 p-2 bg-[#4db6ac] m-2 rounded-lg flex flex-col items-end gap-1" style={{ fontFamily: 'ReemKufi', }}>
          //   <Text className="text-3xl mx-auto font-bold text-white text-center mb-2" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>
          //     سورة {surah.name.ar} ({surah.name.transliteration})
          //   </Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }} >اسم السورة بالعربي: {surah.name.ar}</Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>اسم السورة بالإنجليزي: {surah.name.transliteration}</Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>مكان النزول: {surah.revelation_place.ar}</Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>آيات: {surah.verses_count}</Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>عدد الكلمات: {surah.words_count}</Text>
          //   <Text className="text-white font-bold" style={{ writingDirection: "rtl", fontFamily: "ReemKufi", }}>عدد الحروف: {surah.letters_count}</Text>
          // </View>
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
          <View className="space-y-2 bg-[#4db6ac] m-2 rounded-lg flex flex-col items-start p-4 gap-1">
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
    </View>
  )
}

export default DescriptionBox

const styles = StyleSheet.create({})