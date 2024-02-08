import { useMemo } from "react";
import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils";
import { Button, LinkButton } from "@/components";
import { Feather } from "@expo/vector-icons";
import { useCartStore } from "@/stores";

const Product = () => {
  const { id } = useLocalSearchParams();
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const productItem = useMemo(() => {
    return PRODUCTS.find((item) => item.id === id);
  }, [id]);

  const handleAddToCard = () => {
    if (productItem) {
      cartStore.addProduct(productItem);
      navigation.goBack();
    }
  };

  if (!productItem) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={productItem.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-white text-xl font-heading">
          {productItem.title}
        </Text>

        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(productItem.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {productItem.description}
        </Text>

        {productItem.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button.Root onPress={handleAddToCard}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button.Root>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
};

export default Product;
