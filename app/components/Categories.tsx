import { ScrollView } from 'react-native';
import CardCategorie from './CardCategorie';

export default function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 10,
      }}
    >
      <CardCategorie 
        imageUrl={require('../assets/images/pizza.jpg')} 
        title="pizza" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/burger.jpg')} 
        title="burger" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/sushi.jpg')} 
        title="sushi" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/salad.jpg')} 
        title="salad" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/pancake.jpg')} 
        title="pancake" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/cupcake.jpg')} 
        title="cupcake" 
      />
    </ScrollView>
  );
}