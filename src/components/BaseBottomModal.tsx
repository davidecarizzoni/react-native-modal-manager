import { StyleSheet, View, ViewProps } from "react-native";

export const BaseBottomModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  }
})
