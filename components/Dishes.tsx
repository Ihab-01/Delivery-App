import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { client, urlFor } from '../sanity';
import { addToCart, CartItem, removeFromCart } from '../features/CartSlice';
import type { RootState } from '../store';

type Dish = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: any;
};

type DishesProps = {
  restaurantId: string;
};

function DishRow({ dish }: { dish: Dish }) {
  const dispatch = useDispatch();

  const count = useSelector(
    (state: RootState) =>
      state.cart.items.filter((item: CartItem) => item._id === dish._id).length
  );

  const addItem = () => {
    dispatch(addToCart(dish));
  };

  const removeItem = () => {
    if (count === 0) return;
    dispatch(removeFromCart(dish._id));
  };

  return (
    <View className="bg-white border-b border-gray-200">
      <View className="flex-row items-center p-4">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-semibold mb-1">{dish.name}</Text>
          {dish.description ? (
            <Text className="text-gray-400 mb-2" numberOfLines={2}>
              {dish.description}
            </Text>
          ) : null}
          <Text className="text-gray-600">${dish.price.toFixed(2)}</Text>
        </View>
        {dish.image ? (
          <Image
            source={{ uri: urlFor(dish.image).width(200).height(200).url() }}
            className="h-20 w-20 rounded-md bg-gray-300"
          />
        ) : null}
      </View>

      <View className="flex-row items-center space-x-2 px-4 pb-3">
        <TouchableOpacity onPress={removeItem} disabled={count === 0}>
          <MinusCircleIcon
            size={40}
            color={count > 0 ? '#00CCBB' : 'gray'}
          />
        </TouchableOpacity>
        <Text>{count}</Text>
        <TouchableOpacity onPress={addItem}>
          <PlusCircleIcon size={40} color="#00CCBB" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Dishes({ restaurantId }: DishesProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "restaurant" && _id == $id][0].dishes[]->{
          _id,
          name,
          description,
          price,
          image
        }`,
        { id: restaurantId }
      )
      .then((data) => setDishes(data ?? []));
  }, [restaurantId]);

  return (
    <View>
      {dishes.map((dish) => (
        <DishRow key={dish._id} dish={dish} />
      ))}
    </View>
  );
}

export default Dishes