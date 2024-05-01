import { StyleSheet, View, ViewProps } from "react-native";

export const BaseCenterModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20
  }
})
