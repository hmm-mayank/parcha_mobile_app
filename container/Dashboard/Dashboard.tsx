import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import React from "react";
import { rupeeSymbol } from "../../utils/globals";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      data: [20, 20, 30, 70, 50, 40],
    },
  ],
};

const Dashboard = () => {
  return (
    <>
      <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Orders</Text>
              <Text style={styles.textCount}>10</Text>
            </Card>
          </View>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Sale</Text>
              <Text style={styles.textCount}>{rupeeSymbol + "10K"}</Text>
            </Card>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Orders</Text>
              <Text style={styles.textCount}>10</Text>
            </Card>
          </View>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Sale</Text>
              <Text style={styles.textCount}>{rupeeSymbol + "10K"}</Text>
            </Card>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Orders</Text>
              <Text style={styles.textCount}>10</Text>
            </Card>
          </View>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Card
              containerStyle={[
                styles.cardContainer,
                { borderColor: "#00B4D8" },
              ]}
            >
              <Text style={styles.textLabel}>Total Sale</Text>
              <Text style={styles.textCount}>{rupeeSymbol + "10K"}</Text>
            </Card>
          </View>
        </View>
        <View style={{ marginTop: "5%" }}>
          <LineChart
            data={data}
            width={Dimensions.get("window").width} // from react-native
            height={200}
            fromZero={true}
            chartConfig={{
              backgroundColor: "#90E0EF",
              backgroundGradientFrom: "#03045E",
              backgroundGradientTo: "#90E0EF",

              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 10,
              },
            }}
          />
          <Text style={styles.graphLabel}>Sale Trend</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  textLabel: {
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    textTransform: "uppercase",
  },
  textCount: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  graphLabel: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    fontStyle: "italic",
  },
});
