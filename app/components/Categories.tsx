import { ScrollView } from 'react-native';
import CardCategorie from './CardCategorie';

export default function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      <CardCategorie 
        imageUrl={require('../assets/images/avatar.png')} 
        title="test" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/avatar.png')} 
        title="test" 
      />
      <CardCategorie 
        imageUrl={require('../assets/images/avatar.png')} 
        title="test" 
      />
    </ScrollView>
  );
}