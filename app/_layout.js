import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';

const App = () => {
  // State để lưu trữ hướng màn hình và màu nền
  const [isPortrait, setIsPortrait] = useState(Dimensions.get('window').height >= Dimensions.get('window').width);
  const [backgroundColor, setBackgroundColor] = useState(isPortrait ? 'white' : 'black');

  // Hàm để cập nhật hướng màn hình và màu nền
  const updateOrientation = ({ window: { width, height } }) => {
    const portrait = height >= width;
    setIsPortrait(portrait);
    setBackgroundColor(portrait ? 'white' : 'black');
  };

  useEffect(() => {
    // Lắng nghe sự kiện thay đổi kích thước màn hình
    const subscription = Dimensions.addEventListener('change', updateOrientation);

    // Hủy đăng ký khi component bị hủy
    return () => {
      subscription?.remove?.(); // Sử dụng remove() với subscription
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isPortrait ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundColor}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor }]} // Đặt màu nền của container
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.inner, isPortrait ? styles.portrait : styles.landscape]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hai nút bấm */}
          <View style={isPortrait ? styles.buttonColumn : styles.buttonRow}>
            <Button title="Button 1" onPress={() => {}} color={isPortrait ? 'blue' : 'green'} />
            <Button title="Button 2" onPress={() => {}} color={isPortrait ? 'blue' : 'green'} />
          </View>

          {/* Thêm hình ảnh vào giao diện */}
          <Image
            source={{ uri: 'https://lol-skin.weblog.vc/img/wallpaper/splash/Jinx_37.jpg?1724768382' }} // URL mẫu cho hình ảnh
            style={[styles.image, isPortrait ? styles.imagePortrait : styles.imageLandscape]}
            resizeMode="contain" // Đảm bảo hình ảnh hiển thị đúng tỷ lệ
          />

          {/* Trường nhập liệu */}
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            keyboardType="default"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  portrait: {
    flexDirection: 'column', // Xếp chồng các phần tử theo chiều dọc trong chế độ dọc
  },
  landscape: {
    flexDirection: 'column', // Xếp các phần tử theo chiều dọc trong chế độ ngang để có thêm không gian cho hình ảnh
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '80%', // Đặt chiều rộng của hình ảnh là 80% chiều rộng màn hình
  },
  imagePortrait: {
    height: undefined,
    aspectRatio: 16 / 9, // Tỷ lệ 16:9 cho chế độ dọc
  },
  imageLandscape: {
    height: 200, // Giảm chiều cao hình ảnh trong chế độ ngang
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default App;
