import { useMemo, useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { Button, Header, Input, LinkButton, Product } from "@/components";
import { ProductCartProps, useCartStore } from "@/stores";
import { formatCurrency } from "@/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "5581996350881";

const Cart = () => {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const [address, setAddress] = useState("");

  const totalMemo = useMemo(() => {
    return formatCurrency(
      cartStore.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    );
  }, [cartStore.products]);

  const handleProductRemove = (product: ProductCartProps) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  };

  const handleChangeAddress = (text: string) => {
    setAddress(text);
  };

  const handleOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const mesage = `
      NOVO PEDIDO
      \n Entregar em: ${address}

      ${products}
      
      \n Valor Total: ${totalMemo}
      `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${mesage}`
    );

    cartStore.clear();

    navigation.goBack();

    Alert.alert("Pedido", "Seu pedido foi enviado com sucesso!");
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b bordfer-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>

              <Text className="text-lime-400 text-2xl font-heading">
                {totalMemo}
              </Text>
            </View>

            <Input
              placeholder="Informe seu endereço de entrega com rua, bairro, cep, número e complemento..."
              onChangeText={handleChangeAddress}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
              blurOnSubmit
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button.Root onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>

          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button.Root>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
};

export default Cart;
