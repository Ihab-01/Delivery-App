import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { ArrowLeftIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../../sanity';
import { clearCart, selectCartItems, selectCartTotal } from '../../features/CartSlice';
import type { CartItem } from '../../features/CartSlice';

const DELIVERY_FEE = 5.99;


const START_REGION = {
  latitude: 20,
  longitude: 0,
  latitudeDelta: 60,
  longitudeDelta: 60,
};

type Pin = { latitude: number; longitude: number };

function OrderScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const [address, setAddress] = useState('');
  const [pin, setPin] = useState<Pin | null>(null);

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const grouped: { item: CartItem; dishCount: number }[] = [];
  items.forEach((item: CartItem) => {
    const existing = grouped.find((g) => g.item._id === item._id);
    if (existing) {
      existing.dishCount += 1;
    } else {
      grouped.push({ item, dishCount: 1 });
    }
  });

  const getMyLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow location access to use your current location.');
      return;
    }
    const position = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setPin(coords);
    mapRef.current?.animateToRegion({ ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 });
  };

  const confirmOrder = () => {
    if (!pin) {
      Alert.alert('Choose a location', 'Tap the map or use your current location first.');
      return;
    }
    dispatch(clearCart());
    router.replace('/screens/HomeScreen');
    Alert.alert('Order confirmed', 'Your order is on its way!');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-4 pt-16 pb-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeftIcon size={24} color="#00CCBB" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Your Order</Text>
      </View>

      <ScrollView className="px-4">
        {grouped.length === 0 ? (
          <Text className="text-gray-400 mt-6">Your cart is empty.</Text>
        ) : (
          grouped.map(({ item, dishCount }) => (
            <View key={item._id} className="flex-row items-center py-3 border-b border-gray-100">
              <Text className="text-[#00CCBB] font-bold mr-3">{dishCount} x</Text>
              {item.image ? (
                <Image
                  source={{ uri: urlFor(item.image).width(100).height(100).url() }}
                  className="h-12 w-12 rounded-full bg-gray-300 mr-3"
                />
              ) : null}
              <Text className="flex-1">{item.name}</Text>
              <Text>${(item.price * dishCount).toFixed(2)}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View className="px-4 pt-3 border-t border-gray-200">
        <Text className="font-bold text-lg mb-2">Delivery location</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Address, floor, door code..."
          className="border border-gray-200 rounded-lg px-3 py-2 mb-2"
        />
        <View className="h-40 rounded-lg overflow-hidden">
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={START_REGION}
            onPress={(e) => setPin(e.nativeEvent.coordinate)}
          >
            {pin && (
              <Marker
                coordinate={pin}
                draggable
                onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>
        </View>
        <TouchableOpacity onPress={getMyLocation} className="flex-row items-center mt-2">
          <MapPinIcon size={20} color="#00CCBB" />
          <Text className="text-[#00CCBB] font-bold ml-1">Use my current location</Text>
        </TouchableOpacity>
      </View>

      <View className="p-5 space-y-2">
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="text-gray-500">${total.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Delivery</Text>
          <Text className="text-gray-500">${DELIVERY_FEE.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold text-lg">Total</Text>
          <Text className="font-bold text-lg">${(total + DELIVERY_FEE).toFixed(2)}</Text>
        </View>

        {items.length > 0 && (
          <TouchableOpacity onPress={confirmOrder} className="bg-[#00CCBB] p-4 rounded-lg mt-3">
            <Text className="text-white text-center font-bold text-lg">Confirm Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default OrderScreen