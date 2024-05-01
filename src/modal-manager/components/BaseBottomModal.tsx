import { StyleSheet, Animated, ViewProps } from "react-native";

export const BaseBottomModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <Animated.View style={[styles.container, style]} {...props}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  }
})
