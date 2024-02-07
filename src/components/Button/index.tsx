import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};

type ButtonIconProps = {
  children: ReactNode;
};

const ButtonRootComponent = ({ children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonTextComponent = ({ children }: ButtonTextProps) => {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
};

const ButtonIconComponent = ({ children }: ButtonIconProps) => {
  return children;
};

export const Button = {
  Root: ButtonRootComponent,
  Text: ButtonTextComponent,
  Icon: ButtonIconComponent,
};
