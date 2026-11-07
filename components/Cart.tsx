import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { removeDishFromCart, selectCartItems, selectCartTotal } from '../features/CartSlice';
import type { CartItem } from '../features/CartSlice';

function Cart() {

  const DELIVERY_FEE = 5.99;
    
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <View className="absolute bottom-10 w-full">
        <TouchableOpacity
          onPress={() => setVisible(true)}
          className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center"
        >
          <Text className="text-white font-bold text-lg">{items.length}</Text>
          <Text className="flex-1 text-white font-bold text-lg text-center">View Cart</Text>
          <Text className="text-white font-bold text-lg">${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={visible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-2xl p-5 max-h-[80%]">
            <Text className="text-xl font-bold mb-3">Your Cart</Text>

            <ScrollView>
              {grouped.length === 0 ? (
                <Text className="text-gray-400">Your cart is empty.</Text>
              ) : (
                grouped.map(({ item, dishCount }) => (
                  <View key={item._id} className="flex-row items-center py-2 border-b border-gray-100">
                    <Text className="text-[#00CCBB] font-bold mr-3">{dishCount} x</Text>
                    <Text className="flex-1">{item.name}</Text>
                    <Text className="mr-4">${(item.price * dishCount).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => dispatch(removeDishFromCart(item._id))}>
                      <XCircleIcon size={28} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>

            <View className="mt-4 space-y-2">
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
            </View>

            <View className="flex-row space-x-3 mt-4">
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    className="flex-1 bg-red-500 p-4 rounded-lg"
                >
                    <Text className="text-white text-center font-bold text-lg">Close</Text>
                </TouchableOpacity>

                {items.length > 0 && (
                    <TouchableOpacity
                    onPress={() => {}}
                    className="flex-1 bg-[#00CCBB] p-4 rounded-lg"
                    >
                        <Text className="text-white text-center font-bold text-lg">Order</Text>
                    </TouchableOpacity>
                )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Cart